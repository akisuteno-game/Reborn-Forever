import { CONFIG } from "../config.js";

export class Loop {
  constructor(engine) {
    this.engine = engine;
    this.interval = null;
    this.running = false;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.interval = setInterval(() => this.engine.tick(), CONFIG.TICK_INTERVAL_MS);
  }

  stop() {
    if (!this.running) return;
    clearInterval(this.interval);
    this.interval = null;
    this.running = false;
  }
}
