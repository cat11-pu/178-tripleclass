import assert from "node:assert";
import { readBounds } from "../bounds.js";
import { classifyAll } from "../classify.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("readBounds returns numbers", () => {
  assert.strictEqual(typeof readBounds({ low: 1, high: 2 }).low, "number");
});

check("classifyAll returns bands", () => {
  assert.ok(Array.isArray(classifyAll([1], { low: 1, high: 2 }).bands));
});

check("classifyAll returns counts", () => {
  assert.strictEqual(typeof classifyAll([1], { low: 1, high: 2 }).low, "number");
});

check("render counts bands", () => {
  assert.strictEqual(typeof render({ values: [1], low: 1, high: 2 }).count, "number");
});

check("render exposes bounds", () => {
  assert.strictEqual(typeof render({ values: [1], low: 1, high: 2 }).low_bound, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
