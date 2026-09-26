// classify.js：分档（基线：一律给空表）
import { readBounds } from "./bounds.js";

export function classifyAll(values, spec) {
  return { bands: [], low: 0, mid: 0, high: 0 };
}
