import json
import pathlib
import re
from datetime import datetime, timezone


ROOT = pathlib.Path(r"C:\Users\admin\.openclaw")
SRC_ROOT = ROOT / "workspace" / "_merge_work" / "agency-agents"
OUT = ROOT / "workspace" / "agartha" / "maggie-orchestra" / "residents" / "agency-cast.json"


FIRST_NAMES = {
    "marketing": ["Mary", "Maya", "Mina", "Marlowe", "Monica", "Mira"],
    "sales": ["Sally", "Sienna", "Sage", "Stella", "Simone", "Serena"],
    "engineering": ["Ethan", "Elena", "Ezra", "Eva", "Elliot", "Emery"],
    "design": ["Daria", "Daphne", "Demi", "Delia", "Drew", "Dahlia"],
    "product": ["Priya", "Parker", "Paige", "Pia", "Preston", "Paloma"],
    "project-management": ["Paula", "Penny", "Porter", "Piper", "Pat", "Paris"],
    "support": ["Sam", "Sonia", "Sky", "Shawn", "Sol", "Suri"],
    "testing": ["Talia", "Troy", "Tess", "Theo", "Tina", "Tyler"],
    "paid-media": ["Piper", "Pablo", "Peyton", "Petra", "Phoenix", "Poppy"],
    "strategy": ["Nina", "Noah", "Nora", "Nikolai", "Nia", "Nash"],
    "spatial-computing": ["Xena", "Xavier", "Xiomara", "Xander", "Xia", "Xim"],
    "specialized": ["Quinn", "Quentin", "Queenie", "Qadir", "Qiana", "Quest"],
    "game-development": ["Gabe", "Gia", "Gwen", "Griffin", "Gita", "Grey"],
}


CATEGORY_BINDINGS = {
    "marketing": "companion-agent",
    "sales": "companion-agent",
    "engineering": "builder-agent",
    "design": "builder-agent",
    "product": "builder-agent",
    "project-management": "builder-agent",
    "support": "weather-agent",
    "testing": "nike-messenger-agent",
    "paid-media": "companion-agent",
    "strategy": "builder-agent",
    "spatial-computing": "builder-agent",
    "specialized": "nike-messenger-agent",
    "game-development": "builder-agent",
}


def title_from_slug(slug: str) -> str:
    cleaned = slug.replace(".md", "").replace("_", "-")
    parts = [p for p in cleaned.split("-") if p]
    return " ".join(p.capitalize() for p in parts)


def parse_frontmatter(text: str):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not m:
        return {}
    fm = m.group(1)
    out = {}
    for line in fm.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        out[k.strip().lower()] = v.strip().strip('"').strip("'")
    return out


def collect_markdown():
    allowed = set(FIRST_NAMES.keys())
    for p in SRC_ROOT.rglob("*.md"):
        rel = p.relative_to(SRC_ROOT)
        if not rel.parts:
            continue
        if rel.parts[0] not in allowed:
            continue
        if rel.name.lower() in {"readme.md", "contributing.md", "license.md"}:
            continue
        yield p, rel


def build_cast():
    counters = {}
    residents = []

    for path, rel in collect_markdown():
        category = rel.parts[0] if rel.parts else "specialized"
        counters.setdefault(category, 0)
        idx = counters[category]
        counters[category] += 1

        first_names = FIRST_NAMES.get(category, ["Alex", "Riley", "Jordan", "Taylor", "Casey"])
        first_name = first_names[idx % len(first_names)]

        text = path.read_text(encoding="utf-8", errors="ignore")
        fm = parse_frontmatter(text)
        role_name = fm.get("name") or title_from_slug(rel.stem)
        description = fm.get("description") or f"Specialist for {role_name}."
        emoji = fm.get("emoji", "")
        vibe = fm.get("vibe", "")

        persona_name = f"{first_name} {role_name}"
        slug = f"{category}-{rel.stem}".lower()
        skill_binding = CATEGORY_BINDINGS.get(category, "builder-agent")

        residents.append(
            {
                "id": slug,
                "name": persona_name,
                "first_person_intro": f"Hi, I'm {persona_name}. I own {role_name.lower()} outcomes for the Symphony.",
                "source_agent": {
                    "repo": "msitarzewski/agency-agents",
                    "path": str(rel).replace("\\", "/"),
                    "base_name": role_name,
                    "category": category,
                },
                "specialization": {
                    "role": role_name,
                    "description": description,
                    "vibe": vibe,
                    "emoji": emoji,
                    "kpi_focus": "delivery quality, velocity, and measurable business impact",
                },
                "runtime": {
                    "skill_binding": skill_binding,
                    "provider_hint": "mercury" if category in {"testing", "support", "specialized"} else "local-llm",
                    "resident_mode": "desktop-edge-widget",
                },
            }
        )

    return {
        "registry_version": "0.1.0",
        "source_repo": "https://github.com/msitarzewski/agency-agents",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "resident_count": len(residents),
        "categories": sorted({r["source_agent"]["category"] for r in residents}),
        "residents": residents,
    }


def main():
    if not SRC_ROOT.exists():
        raise FileNotFoundError(f"Source repo not found: {SRC_ROOT}")
    cast = build_cast()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(cast, indent=2), encoding="utf-8")
    print(str(OUT))
    print(cast["resident_count"])


if __name__ == "__main__":
    main()
