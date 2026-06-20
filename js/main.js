import { createTabs } from "./modules/tabs/tabUI.js";
import { TabManager } from "./modules/tabs/tabManager.js";
import { Engine } from "./core/engine.js";
import { Loop } from "./core/loop.js";
import { EventBus } from "./core/eventBus.js";
import { UIManager } from "./ui/uiManager.js";
import { PlayerManager } from "./systems/player/playerManager.js";
import { SaveManager } from "./save/saveManager.js";

async function bootstrap() {
  // 初期設定読み込み（将来拡張）
  // create tabs
  createTabs(document.getElementById("side-tabs"));

  // tab manager
  const tabs = new TabManager();
  tabs.init();

  // core
  const bus = new EventBus();
  const engine = new Engine(bus);
  const loop = new Loop(engine);

  // systems
  const player = new PlayerManager(engine, bus);
  const save = new SaveManager(engine, bus);

  // ui
  const ui = new UIManager(engine, bus, { player, save, tabs });
  ui.init();

  // expose for dev
  window.RF = { engine, loop, bus, player, save, ui, tabs };

  // start loop (paused by default)
  loop.start();
}

bootstrap();
