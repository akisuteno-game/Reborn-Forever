import { CONFIG } from "../config.js";

export class SaveManager {
  constructor(engine, bus) {
    this.engine = engine;
    this.bus = bus;
  }

  save() {
    const payload = {
      state: this.engine.state,
      ts: Date.now()
    };
    localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(payload));
    this.bus.emit("save:done", payload);
    alert("セーブしました");
  }

  load() {
    const raw = localStorage.getItem(CONFIG.SAVE_KEY);
    if (!raw) { alert("セーブデータがありません"); return; }
    try {
      const payload = JSON.parse(raw);
      if (payload.state && payload.state.player) {
        this.engine.setPlayer(payload.state.player);
        this.engine.state.time = payload.state.time || 0;
        this.bus.emit("save:loaded", payload);
        alert("ロードしました");
      }
    } catch (e) {
      console.error(e);
      alert("ロードに失敗しました");
    }
  }
}
