// js/ui/ui.js
export default class UI {
  constructor(engine) {
    this.engine = engine;
    this.logEl = document.getElementById('log');
    this.jobListEl = document.getElementById('job-list');
    this.skillListEl = document.getElementById('skill-list');
    this.playerNameEl = document.getElementById('player-name');
    this.playerLevelEl = document.getElementById('player-level');
    this.playerXpEl = document.getElementById('player-xp');
    this.playerGoldEl = document.getElementById('player-gold');
  }

  init() {
    this.renderJobs();
    this.renderSkills();
    this.renderPlayer();
  }

  log(msg) {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.textContent = `[${time}] ${msg}`;
    this.logEl.prepend(line);
  }

  renderPlayer() {
    const s = this.engine.state;
    this.playerNameEl.textContent = s.player.name;
    this.playerLevelEl.textContent = s.player.level;
    this.playerXpEl.textContent = s.player.exp;
    this.playerGoldEl.textContent = s.player.gold;
  }

  renderJobs() {
    const jobSys = this.engine.systems.jobSystem;
    const jobs = jobSys.listAvailableJobs(this.engine.state.player.level);
    this.jobListEl.innerHTML = '';
    jobs.forEach(j => {
      const el = document.createElement('div');
      el.className = 'job';
      el.innerHTML = `<div><strong>${j.name}</strong><div class="small">income ${j.baseIncome}</div></div>`;
      const btn = document.createElement('button');
      btn.textContent = '選択';
      btn.addEventListener('click', () => {
        jobSys.setActiveJob(j.id);
        this.log(`${j.name} を選択しました`);
      });
      el.appendChild(btn);
      this.jobListEl.appendChild(el);
    });
  }

  renderSkills() {
    const skillSys = this.engine.systems.skillSystem;
    const skills = skillSys.listSkills();
    this.skillListEl.innerHTML = '';
    skills.forEach(s => {
      const el = document.createElement('div');
      el.className = 'skill';
      el.innerHTML = `<div><strong>${s.name}</strong><div class="small">${s.description}</div></div>`;
      const btn = document.createElement('button');
      btn.textContent = s.owned ? '習得済' : `習得 (${s.cost})`;
      btn.disabled = s.owned;
      btn.addEventListener('click', () => {
        const ok = skillSys.buySkill(s.id, this.engine.state);
        if (ok) {
          this.renderSkills();
          this.renderPlayer();
        } else {
          this.log('スキル習得に失敗しました（ゴールド不足など）');
        }
      });
      el.appendChild(btn);
      this.skillListEl.appendChild(el);
    });
  }
}
