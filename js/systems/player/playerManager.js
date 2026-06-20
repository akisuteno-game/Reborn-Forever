export class PlayerManager {
  constructor(engine, bus) {
    this.engine = engine;
    this.bus = bus;
    this.player = null;
    this.bus.on("player:leveled", p => this.onLevel(p));
  }

  load(data) {
    this.player = data;
    this.engine.setPlayer(this.player);
  }

  onLevel(p) {
    // placeholder: level up logic
    console.log("leveled", p.level);
  }
}
