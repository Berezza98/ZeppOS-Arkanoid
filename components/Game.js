import Background from "./Background";
import Platform from "./Platform";
import Ball from "./Ball";

export default class Game {
  constructor() {
    this.fps = 30;
    this.timer = null;
    this.platform = new Platform(this);
    this.ball = new Ball(this);

    this.addGameObjects();
  }

  addGameObjects() {
    new Background();

    this.gameObjects = [
      this.ball,
      this.platform
    ];
  }

  run() {
    this.timer = timer.createTimer( 0, 1000 / this.fps, () => {
      this.gameObjects.forEach(obj => obj.update());
    });
  }

  stop() {
    if (!this.timer) return;

    timer.stopTimer(this.timer);
  }
}