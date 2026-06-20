// js/core/engine.js
export class Engine {
  constructor(state) {
    this.state = state;
    this.systems = {};
  }

  register(name, system) {
    this.systems[name] = system;
    if (system.init) system.init(this);
  }

  tick(delta = 1) {
    // delta は秒単位だがここでは1tickごとに1として扱う
    for (const s of Object.values(this.systems)) {
      if (s.update) s.update(delta, this.state, this);
    }
  }
}
