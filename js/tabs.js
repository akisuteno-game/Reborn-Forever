// js/tabs.js
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // タブの active 切り替え
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // コンテンツの active 切り替え
      contents.forEach(c => {
        c.classList.remove("active");
        if (c.id === `tab-${target}`) c.classList.add("active");
      });
    });
  });
});
