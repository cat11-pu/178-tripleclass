// app.js：渲染结果
import { readBounds } from "./bounds.js";
import { classifyAll } from "./classify.js";

export function render(spec) {
  const values = spec.values || [];
  const bounds = readBounds(spec);
  const view = classifyAll(values, spec);
  const bands = view.bands || [];
  return { bands: bands, low: view.low || 0, mid: view.mid || 0, high: view.high || 0,
           count: bands.length, low_bound: bounds.low, high_bound: bounds.high };
}
