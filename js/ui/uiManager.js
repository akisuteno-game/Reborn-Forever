import { CONFIG } from "../config.js";

export class UIManager {
  constructor(engine, bus, deps) {
    this.engine = engine;
    this.bus = bus;
    this.deps = deps;
    this.auto = false;
  }

  init() {
    this.bindButtons();
    this.bus.on("engine:tick", () => this.onTick());
    this.bus.on("player:loaded", p => this.renderPlayer(p));
    // load default player
    this.engine.setPlayer({ ...CONFIG.DEFAULT_PLAYER });
  }

  bindButtons() {
    document.getElementById("btn-tick").addEventListener("click", () => this.engine.tick());
    document.getElementById("btn-auto").addEventListener("click", () => {
      this.auto = !this.auto;
      if (this.auto) this.deps.loop?.start?.();
      else this.deps.loop?.stop?.();
    });
    document.getElementById("btn-save").addEventListener("click", () => this.deps.save.save());
    document.getElementById("btn-load").addEventListener("click", () => this.deps.save.load());
  }

  onTick() {
    const p = this.engine.state.player;
    if (!p) return;
    // simple xp gain for demo
    p.xp += 1;
    if (p.xp >= 10) {
      p.level += 1;
      p.xp = 0;
      this.bus.emit("player:leveled", p);
    }
    this.renderPlayer(p);
    this.appendLog(`Tick: time=${this.engine.state.time} xp=${p.xp}`);
  }

  renderPlayer(p) {
    document.getElementById("player-name").textContent = p.name;
    document.getElementById("player-level").textContent = p.level;
    document.getElementById("player-xp").textContent = p.xp;
    document.getElementById("player-gold").textContent = p.gold;
  }

  appendLog(text) {
    const el = document.getElementById("log");
    const line = document.createElement("div");
    line.textContent = text;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
  }
}
