import Background from "./Background";
import Platform from "./Platform";
import Ball from "./Ball";

export default class Game {
  constructor() {
    this.fps = 30;
    this.timer = null;

    this.addGameObjects();
  }

  addGameObjects() {
    // new Background();
    new Platform();

    this.gameObjects = [
      new Ball(),
      // new Platform(),
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