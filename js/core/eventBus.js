export class EventBus {
  constructor() {
    this.handlers = {};
  }

  on(event, fn) {
    (this.handlers[event] ||= []).push(fn);
  }

  off(event, fn) {
    if (!this.handlers[event]) return;
    this.handlers[event] = this.handlers[event].filter(f => f !== fn);
  }

  emit(event, payload) {
    (this.handlers[event] || []).forEach(fn => {
      try { fn(payload); } catch (e) { console.error(e); }
    });
  }
}
