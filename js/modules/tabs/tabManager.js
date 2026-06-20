export class TabManager {
  constructor() {
    this.tabs = [];
    this.contents = [];
  }

  init() {
    this.tabs = document.querySelectorAll(".tab");
    this.contents = document.querySelectorAll(".tab-content");

    // default active
    if (this.tabs.length) {
      const first = this.tabs[0];
      first.classList.add("active");
    }

    this.tabs.forEach(tab => {
      tab.addEventListener("click", () => this.switch(tab.dataset.tab));
    });
  }

  switch(id) {
    this.tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === id));
    this.contents.forEach(c => c.classList.toggle("active", c.id === `tab-${id}`));
  }
}
