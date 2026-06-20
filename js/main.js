// js/main.js
import { Engine } from './js/core/engine.js';
import { Loop } from './js/core/loop.js';
import JobSystem from './js/systems/jobSystem.js';
import SkillSystem from './js/systems/skillSystem.js';
import SaveManager from './js/save/saveManager.js';
import UI from './js/ui/ui.js';

// 初期 state
const initialState = {
  player: { name: '名無し', level: 1, exp: 0, gold: 0 },
  meta: { ticks: 0 }
};

// bootstrap
async function loadJSON(path) {
  const res = await fetch(path);
  return res.json();
}

async function main() {
  const jobs = await loadJSON('data/jobs.json');
  const skills = await loadJSON('data/skills.json');

  const engine = new Engine(JSON.parse(JSON.stringify(initialState)));
  const jobSystem = new JobSystem(jobs);
  const skillSystem = new SkillSystem(skills);
  const save = new SaveManager();
  const ui = new UI(engine);

  engine.register('jobSystem', jobSystem);
  engine.register('skillSystem', skillSystem);
  engine.register('ui', ui);

  // load saved state if exists
  const loaded = save.load();
  if (loaded) {
    engine.state = Object.assign(engine.state, loaded);
    ui.log('セーブデータを読み込みました');
  }

  ui.init();

  // loop
  const loop = new Loop(engine);

  // wire buttons
  document.getElementById('btn-tick').addEventListener('click', () => {
    engine.tick(1);
    ui.renderPlayer();
  });

  document.getElementById('btn-auto').addEventListener('click', (e) => {
    loop.toggle();
    e.target.textContent = loop.running ? '自動停止' : '自動開始';
    ui.log(loop.running ? '自動開始' : '自動停止');
  });

  document.getElementById('btn-save').addEventListener('click', () => {
    save.save(engine.state);
    ui.log('セーブしました');
  });

  document.getElementById('btn-load').addEventListener('click', () => {
    const s = save.load();
    if (s) {
      engine.state = Object.assign(engine.state, s);
      ui.renderPlayer();
      ui.renderJobs();
      ui.renderSkills();
      ui.log('ロードしました');
    } else {
      ui.log('セーブが見つかりません');
    }
  });

  // expose for debugging
  window.RF = { engine, loop, save, ui };
}

main().catch(e => console.error(e));
