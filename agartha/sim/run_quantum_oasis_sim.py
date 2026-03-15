import json
import math
import pathlib
from datetime import datetime, timezone


ROOT = pathlib.Path(r"C:\Users\admin\.openclaw")
ASSUMPTIONS_PATH = ROOT / "workspace" / "agartha" / "sim" / "assumptions.base.json"
OUT_DIR = ROOT / ".runtime" / "quantum-oasis-sim"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def logistic(t, k=0.9, x0=5.0):
    return 1.0 / (1.0 + math.exp(-k * (t - x0)))


def blend(initial, max_value, t, horizon):
    progress = logistic(t * 10.0 / max(horizon, 1), k=0.9, x0=5.0)
    return initial + (max_value - initial) * progress


def simulate(data):
    a = data["assumptions"]
    rc = data["risk_controls"]
    horizon = int(data.get("horizon_years", 10))
    start_year = int(data.get("start_year", 2026))

    governance = (
        rc["governance_quality"] * 0.35
        + rc["regulatory_alignment"] * 0.25
        + rc["execution_discipline"] * 0.25
        + rc["public_trust"] * 0.15
    )

    rows = []
    for i in range(horizon + 1):
        year = start_year + i
        t = i / max(horizon, 1)

        ubo = blend(a["ubo_adoption_rate_initial"], a["ubo_adoption_rate_max"], i, horizon)
        energy = blend(
            a["energy_independence_initial"],
            a["energy_independence_max"],
            i,
            horizon,
        )
        data_sovereignty = blend(
            a["data_sovereignty_index_initial"],
            a["data_sovereignty_index_max"],
            i,
            horizon,
        )
        pooling = blend(
            a["tier1_resource_pooling_initial"],
            a["tier1_resource_pooling_max"],
            i,
            horizon,
        )

        system_synergy = (
            ubo * 0.25 + energy * 0.25 + data_sovereignty * 0.25 + pooling * 0.25
        )
        effective_factor = system_synergy * (0.6 + 0.8 * governance)

        productivity_gain = effective_factor * a["productivity_gain_ceiling"]
        resilience_gain = effective_factor * a["resilience_gain_ceiling"]
        energy_cost_reduction = effective_factor * 0.45
        emissions_reduction = effective_factor * 0.32

        rows.append(
            {
                "year": year,
                "ubo_adoption_rate": round(ubo, 4),
                "energy_independence_rate": round(energy, 4),
                "data_sovereignty_index": round(data_sovereignty, 4),
                "tier1_pooling_index": round(pooling, 4),
                "system_synergy_index": round(system_synergy, 4),
                "productivity_gain_pct": round(productivity_gain * 100.0, 2),
                "resilience_gain_pct": round(resilience_gain * 100.0, 2),
                "energy_cost_reduction_pct": round(energy_cost_reduction * 100.0, 2),
                "emissions_reduction_pct": round(emissions_reduction * 100.0, 2),
            }
        )

    final = rows[-1]
    summary = {
        "scenario_name": data.get("scenario_name", "quantum_oasis"),
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "horizon_years": horizon,
        "final_year": final["year"],
        "final_metrics": final,
        "narrative": (
            "Model indicates strongest gains when governance quality and execution discipline "
            "rise in parallel with energy independence and data sovereignty. "
            "The delta between baseline and integrated adoption drives most value."
        ),
        "disclaimer": (
            "Exploratory scenario model, not a forecast. Use as strategy input only."
        ),
    }
    return {"inputs": data, "summary": summary, "timeseries": rows}


def main():
    assumptions = json.loads(ASSUMPTIONS_PATH.read_text(encoding="utf-8"))
    result = simulate(assumptions)

    latest_path = OUT_DIR / "latest.json"
    stamped_path = OUT_DIR / (
        "run-" + datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S") + ".json"
    )
    payload = json.dumps(result, indent=2)
    latest_path.write_text(payload, encoding="utf-8")
    stamped_path.write_text(payload, encoding="utf-8")
    print(str(latest_path))


if __name__ == "__main__":
    main()
