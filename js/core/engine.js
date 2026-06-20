export class Engine {
  constructor(eventBus) {
    this.bus = eventBus;
    this.state = {
      player: null,
      time: 0
    };
  }

  setPlayer(playerData) {
    this.state.player = playerData;
    this.bus.emit("player:loaded", playerData);
  }

  tick() {
    this.state.time++;
    this.bus.emit("engine:tick", { time: this.state.time });
  }
}
