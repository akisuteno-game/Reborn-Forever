// js/save/saveManager.js
export default class SaveManager {
  constructor(key = 'reborn_forever_v1') {
    this.key = key;
  }

  save(state) {
    try {
      const payload = JSON.stringify(state);
      localStorage.setItem(this.key, payload);
      return true;
    } catch (e) {
      console.error('Save failed', e);
      return false;
    }
  }

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Load failed', e);
      return null;
    }
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
