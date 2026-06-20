// js/systems/jobSystem.js
export default class JobSystem {
  constructor(jobsData) {
    this.jobsData = jobsData;
    this.activeJob = null;
  }

  init(engine) {
    this.engine = engine;
    // 初期ジョブをセット
    this.activeJob = this.jobsData[0].id;
  }

  getJobInfo(id) {
    return this.jobsData.find(j => j.id === id);
  }

  update(delta, state) {
    // 毎tickで収入を加算
    const job = this.getJobInfo(this.activeJob);
    if (!job) return;
    // スキル倍率を考慮
    const skillSys = this.engine.systems.skillSystem;
    let multiplier = 1;
    if (skillSys) multiplier = skillSys.getIncomeMultiplierForJob(job.id);
    const income = Math.floor(job.baseIncome * multiplier);
    state.player.gold += income;
    state.player.exp += job.expGain;
    this.engine.systems.ui && this.engine.systems.ui.log(`+${income} gold from ${job.name}`);
  }

  setActiveJob(id) {
    if (this.getJobInfo(id)) this.activeJob = id;
  }

  listAvailableJobs(playerLevel) {
    return this.jobsData.filter(j => playerLevel >= j.unlockAtLevel);
  }
}
