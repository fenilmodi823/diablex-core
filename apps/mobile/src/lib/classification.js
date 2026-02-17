export const HYPO = 70;
export const NORMAL_LOW = 70;
export const NORMAL_HIGH = 180;
export const VERY_HIGH = 250;

export function classify(gl) {
    if (gl == null || Number.isNaN(gl)) return { label: "—", tone: "neutral", color: "#64748b" };
    if (gl < HYPO) return { label: "LOW", tone: "bad", color: "#ef4444" };
    if (gl <= NORMAL_HIGH) return { label: "IN RANGE", tone: "good", color: "#22c55e" };
    if (gl < VERY_HIGH) return { label: "HIGH", tone: "warn", color: "#f59e0b" };
    return { label: "VERY HIGH", tone: "bad", color: "#ef4444" };
}
