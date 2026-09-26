// classify.js：分档（小于下界低档，大于等于上界高档，其余中档；一次扫描）
import { readBounds } from "./bounds.js";

export function classifyAll(values, spec) {
  const bounds = readBounds(spec);
  const low = bounds.low;
  const high = bounds.high;
  const bands = new Array(values.length);
  let lowCount = 0;
  let midCount = 0;
  let highCount = 0;
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value < low) {
      bands[index] = "low";
      lowCount += 1;
    } else if (value < high) {
      bands[index] = "mid";
      midCount += 1;
    } else {
      bands[index] = "high";
      highCount += 1;
    }
  }
  return { bands: bands, low: lowCount, mid: midCount, high: highCount };
}
