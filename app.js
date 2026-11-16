// 讀 terms.js 的 TERMS，產生首頁和名詞內頁。新增名詞不需要改這個檔案。
(function () {
  const CATS = ["基礎概念", "使用技巧", "進階應用"];
  const byId = Object.fromEntries(TERMS.map(t => [t.id, t]));
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  // ---------- 首頁 ----------
  const grid = document.getElementById("entries");
  if (grid) {
    const search = document.getElementById("search");
    const catBox = document.getElementById("cats");
    const count = document.getElementById("count");
    let cat = null;

    ["全部", ...CATS].forEach(c => {
      const b = el("button", null, c);
      b.type = "button";
      b.onclick = () => { cat = c === "全部" ? null : c; render(); };
      catBox.appendChild(b);
    });

    function render() {
      const q = search.value.trim().toLowerCase();
      const list = TERMS.filter(t => (!cat || t.category === cat) &&
        (!q || [t.term, t.zh, t.oneLiner, t.definition].join(" ").toLowerCase().includes(q)));
      grid.innerHTML = "";
      list.forEach(t => {
        const a = el("a", "entry"); a.href = "term.html?id=" + encodeURIComponent(t.id);
        const c = el("span", "cat", t.category); c.dataset.c = t.category;
        a.append(c, el("p", "head", t.term), el("p", "zh", t.zh), el("p", "line", t.oneLiner));
        grid.appendChild(a);
      });
      if (!list.length) grid.appendChild(el("p", "empty", "找不到這個名詞，換個關鍵字試試"));
      count.textContent = `共 ${TERMS.length} 個名詞，目前顯示 ${list.length} 個`;
      catBox.querySelectorAll("button").forEach(b =>
        b.setAttribute("aria-pressed", String((b.textContent === "全部" ? null : b.textContent) === cat)));
    }
    search.addEventListener("input", render);
    render();
  }

  // ---------- 名詞內頁 ----------
  const box = document.getElementById("term");
  if (box) {
    const t = byId[new URLSearchParams(location.search).get("id")];
    if (!t) { box.appendChild(el("p", "empty", "找不到這個名詞，回首頁看看吧")); return; }
    document.title = `${t.term}（${t.zh}）｜AI 名詞小辭典`;
    const c = el("span", "cat", t.category); c.dataset.c = t.category;
    box.append(c, el("h1", "term-title", t.term), el("p", "term-zh", t.zh), el("p", "oneliner", t.oneLiner));
    [["白話定義", t.definition], ["生活比喻", t.analogy], ["實際例子", t.example]].forEach(([h, p]) => {
      const s = el("section", "block"); s.append(el("h2", null, h), el("p", null, p)); box.appendChild(s);
    });
    const rel = el("section", "block"); rel.appendChild(el("h2", null, "相關名詞"));
    const links = el("div", "related");
    t.related.filter(id => byId[id]).forEach(id => {
      const a = el("a", null, `${byId[id].term}・${byId[id].zh}`); a.href = "term.html?id=" + id; links.appendChild(a);
    });
    rel.appendChild(links); box.appendChild(rel);
    box.appendChild(el("p", "meta", `收錄日期：${t.added}`));
  }
})();
