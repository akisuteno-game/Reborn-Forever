// js/systems/skillSystem.js
export default class SkillSystem {
  constructor(skillsData) {
    this.skillsData = skillsData;
    this.owned = {}; // id -> level (0/1)
  }

  init(engine) {
    this.engine = engine;
  }

  buySkill(id, state) {
    const s = this.skillsData.find(x => x.id === id);
    if (!s) return false;
    if (this.owned[id]) return false;
    if (state.player.gold < s.cost) return false;
    state.player.gold -= s.cost;
    this.owned[id] = 1;
    this.engine.systems.ui && this.engine.systems.ui.log(`スキル習得: ${s.name}`);
    return true;
  }

  getIncomeMultiplierForJob(jobId) {
    let m = 1;
    for (const id in this.owned) {
      const s = this.skillsData.find(x => x.id === id);
      if (!s) continue;
      if (!s.targetJob || s.targetJob === jobId) m *= s.multiplier;
    }
    return m;
  }

  listSkills() {
    return this.skillsData.map(s => ({ ...s, owned: !!this.owned[s.id] }));
  }
}
