// bounds.js：读阈值并校验（下界必须小于上界，且两者都是整数）
export function readBounds(spec) {
  const low = spec && spec.low;
  const high = spec && spec.high;
  if (!Number.isInteger(low) || !Number.isInteger(high) || !(low < high)) {
    const error = new Error("bad bounds: low must be an integer strictly less than high");
    error.code = "E_BAD_BOUNDS";
    throw error;
  }
  return { low: low, high: high };
}
