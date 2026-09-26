// classify.js：分档（小于下界低档，大于等于下界且小于上界中档，大于等于上界高档）
import { readBounds } from "./bounds.js";

export function classifyAll(values, spec) {
  const bounds = readBounds(spec);
  const low = bounds.low;
  const high = bounds.high;
  const bands = new Array(values.length);
  let lowCount = 0;
  let midCount = 0;
  let highCount = 0;
  for (let i = 0; i < values.length; i += 1) {
    const value = values[i];
    if (value < low) {
      bands[i] = "low";
      lowCount += 1;
    } else if (value < high) {
      bands[i] = "mid";
      midCount += 1;
    } else {
      bands[i] = "high";
      highCount += 1;
    }
  }
  return { bands: bands, low: lowCount, mid: midCount, high: highCount };
}
