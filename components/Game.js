import Background from "./Background";
import Platform from "./Platform";
import Ball from "./Ball";
import Brick from "./Brick";

export default class Game {
  constructor() {
    this.fps = 30;
    this.timer = null;
    this.background = new Background(this);
    this.platform = new Platform(this);
    this.ball = new Ball(this);
    this.bricks = Brick.generateField(this);

    this.addGameObjects();
  }

  addGameObjects() {
    this.gameObjects = [
      this.ball,
      this.platform
    ];
  }

  run() {
    this.timer = timer.createTimer( 0, 1000 / this.fps, () => {
      this.gameObjects.forEach(obj => obj.update());
      this.bricks.forEach(brick => brick.update());
    });
  }

  stop() {
    if (!this.timer) return;

    timer.stopTimer(this.timer);
  }
}