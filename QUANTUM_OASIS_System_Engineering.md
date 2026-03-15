# System-Level Engineering: From ZT to Real-World Power

## 1. The Resistance Bottleneck

Material performance, whether organic or segmented, is often undermined by **system-level engineering failures**. Moving from ZT to real-world power requires addressing the **"Resistance Bottleneck."**

---

## 2. The 29W vs. 40W Gap

In the characterization of INBC1-127.08HTS systems, a **theoretical capacity of 40W often yields only 29W in practice.**

This **11W discrepancy** is a KPI that R&D must address through rigorous interface engineering.

### Mathematical Models for Sizing

**Open Circuit Voltage:**
> V_OC = 0.4306 × ΔT

**Internal Resistance:**
> R_int = 9.41 ± 0.77 Ω

These linear models enable accurate electrical matching between TEG output and load requirements.

---

## 3. Strategies for Resolving Thermal Contact Resistance

The parasitic **7°C temperature drop** observed at module interfaces must be eliminated through:

| Strategy | Method | Impact |
|----------|-------|--------|
| **Thermal Interface Materials (TIMs)** | High-conductivity metallic pastes or carbon-based pads | Fills microscopic air gaps |
| **Mechanical Clamping Pressure** | Standardized compression (150-300 psi) | Ensures uniform surface contact |
| **Surface Flattening/Micromachining** | Precision polishing or CMP on heat transfer blocks | Minimizes surface variation |

---

## 4. Hybrid Integration Roadmap

System-level deployment must incorporate:

1. **Phase Change Materials (PCM):**
   - Thermal buffering
   - Protects TEG from intermittent heat spikes in industrial processes

2. **Heat Pipes (HP):**
   - Heat transfer from remote/physically restricted sources
   - Example: internal foundry walls to TEG

3. **Vortex Generators:**
   - Enhances convective heat transfer in forced-cooling setups
   - Balances heat transfer rate against pressure drop

---

## 5. Power Conditioning

**Raw TEG output is highly unstable (10-300 mV).**

R&D must integrate **DC-DC voltage booster circuits** with multilevel conversion topologies.

These boosters can regulate and step up voltage (e.g., to 24V or 36V) with conversion efficiencies improved by **up to 400%** — making harvested energy useful for automotive or industrial loads.

---

## 6. Final Technical Feasibility

> **The capturing of industrial thermal losses via optimized TEGs is no longer an embryonic theory but a medium-term industrial reality.**

By addressing interface resistances and prioritizing nanostructured PGEC materials, we can transform waste heat into a **competitive, large-scale clean energy source**.

---

*System Engineering Appendix — Quantum Oasis R&D Roadmap*
*Document Version 1.0 — February 2026*
