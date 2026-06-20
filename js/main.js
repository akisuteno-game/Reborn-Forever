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

// JSON 読み込み
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

  // システム登録
  engine.register('jobSystem', jobSystem);
  engine.register('skillSystem', skillSystem);
  engine.register('ui', ui);

  // セーブデータ読み込み
  const loaded = save.load();
  if (loaded) {
    engine.state = Object.assign(engine.state, loaded);
    ui.log('セーブデータを読み込みました');
  }

  // UI 初期化
  ui.init();

  // ★ ここが重要：初期描画を強制する
  ui.renderJobs();
  ui.renderSkills();
  ui.renderPlayer();

  // ループ
  const loop = new Loop(engine);

  // ボタン処理
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

  // デバッグ用
  window.RF = { engine, loop, save, ui };
}

main().catch(e => console.error(e));
