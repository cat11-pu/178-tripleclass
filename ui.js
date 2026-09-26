// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let high = spec.high || 0;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，下界 " + spec.low + "，上界 " + high + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { high: high }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.bands.forEach(function (band, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = String((spec.values || [])[spot]);
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (band === "mid" ? "" : " ok");
      mark.textContent = band === "low" ? "低档" : (band === "mid" ? "中档" : "高档");
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "低 " + view.low + " 个，中 " + view.mid + " 个，高 " + view.high + " 个";
    parts.log.textContent = "上界 " + high;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "分档";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "上界加五";
  moreButton.addEventListener("click", function () {
    high = high + 5;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "上界减五";
  lessButton.addEventListener("click", function () {
    high = high - 5;
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "上界";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(high);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) { high = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看三档计数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { high: high }));
    parts.out.textContent = "低 " + view.low + "，中 " + view.mid + "，高 " + view.high;
  });
  parts.controls.appendChild(readButton);

  draw();
}
