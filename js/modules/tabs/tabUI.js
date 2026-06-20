import { tabConfig } from "./tabConfig.js";

export function createTabs(container) {
  container.innerHTML = "";
  tabConfig.forEach(tab => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.dataset.tab = tab.id;
    btn.textContent = tab.label;
    container.appendChild(btn);
  });
}
