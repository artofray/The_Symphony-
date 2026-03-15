import json
import pathlib
import re
from datetime import datetime, timezone


ROOT = pathlib.Path(r"C:\Users\admin\.openclaw")
SRC = ROOT / "workspace" / "_merge_work" / "The-Oasis" / "components" / "apps" / "round-table" / "constants.ts"
OUT = ROOT / "workspace" / "agartha" / "maggie-orchestra" / "residents" / "resident-registry.json"


ROLE_MAP = {
    "Inner Circle": ("Conductor", "Conductor"),
    "Consultant": ("Strategist", "Violin"),
    "Mansion Staff": ("Operator", "Percussion"),
    "Creative": ("Creator", "Brass"),
    "Entertainment": ("Performer", "Brass"),
    "Companion": ("Companion", "Harp"),
    "Self Help": ("Guide", "Flute"),
    "NSFW": ("Companion", "Harp"),
}


def parse_agents(ts_text: str):
    pattern = re.compile(
        r"\{\s*id:\s*'(?P<id>[^']+)'\s*,"
        r".*?name:\s*'(?P<name>[^']+)'\s*,"
        r".*?description:\s*'(?P<description>[^']*)'\s*,"
        r".*?avatarColor:\s*'(?P<avatarColor>[^']+)'\s*,"
        r".*?colorHex:\s*'(?P<colorHex>[^']+)'\s*,"
        r".*?currentActivity:\s*'(?P<currentActivity>[^']*)'\s*,"
        r".*?category:\s*'(?P<category>[^']+)'",
        re.S,
    )
    return [m.groupdict() for m in pattern.finditer(ts_text)]


def build_registry(items):
    residents = []
    for i in items:
        role, instrument = ROLE_MAP.get(i["category"], ("Specialist", "Violin"))
        residents.append(
            {
                "id": i["id"],
                "name": i["name"],
                "role": role,
                "instrument": instrument,
                "category": i["category"],
                "profile": {
                    "description": i["description"],
                    "current_activity": i["currentActivity"],
                    "avatar": {
                        "source": "the-oasis",
                        "avatar_color": i["avatarColor"],
                        "color_hex": i["colorHex"],
                    },
                },
                "desktop_presence": {
                    "enabled": True,
                    "dock_mode": "edge",
                    "allow_user_drag": True,
                    "idle_behavior": "sit",
                    "micro_scene_mode": "user_defined",
                },
                "runtime": {
                    "select_via_agent_api": True,
                    "default_skill_binding": "builder-agent" if i["category"] != "Inner Circle" else "companion-agent",
                },
            }
        )

    return {
        "registry_version": "0.1.0",
        "source_repo": "https://github.com/artofray/The-Oasis.git",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "resident_count": len(residents),
        "residents": residents,
    }


def main():
    if not SRC.exists():
        raise FileNotFoundError(f"Source not found: {SRC}")
    text = SRC.read_text(encoding="utf-8", errors="ignore")
    residents = parse_agents(text)
    registry = build_registry(residents)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(registry, indent=2), encoding="utf-8")
    print(str(OUT))
    print(registry["resident_count"])


if __name__ == "__main__":
    main()
