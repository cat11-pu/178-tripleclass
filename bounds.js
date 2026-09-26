// bounds.js：读阈值并校验（下界必须小于上界，两者都必须是整数）
export function readBounds(spec) {
  const low = spec && spec.low;
  const high = spec && spec.high;
  if (!Number.isInteger(low) || !Number.isInteger(high) || !(low < high)) {
    const error = new Error("E_BAD_BOUNDS: low 与 high 必须是整数且 low < high");
    error.code = "E_BAD_BOUNDS";
    throw error;
  }
  return { low: low, high: high };
}
