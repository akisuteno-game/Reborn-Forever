// js/core/loop.js
export class Loop {
  constructor(engine) {
    this.engine = engine;
    this.running = false;
    this.interval = null;
    this.tickMs = 1000; // 1秒ごと
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.interval = setInterval(() => {
      this.engine.tick(1);
    }, this.tickMs);
  }

  stop() {
    this.running = false;
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  toggle() {
    this.running ? this.stop() : this.start();
  }
}
