import Background from "./Background";
import Platform from "./Platform";
import Ball, { DIED_EVENT } from "./Ball";
import Brick, { BREAK_EVENT } from "./Brick";
import levelGeneration from "../levels";
import { isLevelExist } from "../helpers/levels";

export default class Game {
  constructor(level) {
    this.level = level;
    this.fps = 30;
    this.timer = null;
    this.background = new Background('levels/1.png');
    this.platform = new Platform(this);
    this.ball = new Ball(this);

    this.addGameObjects();
    this.addListeners();
  }

  addListeners() {
    hmApp.registerGestureEvent((event) => {
      switch (event) {
        case hmApp.gesture.UP:
          this.ball.start();
          break
      }

      return false
    });

    this.background.onClick(() => {
      this.ball.start();
    });

    this.ball.on(DIED_EVENT, () => {
      this.lose();
    });
  }

  addGameObjects() {
    this.gameObjects = [
      this.ball,
      this.platform
    ];

    this.bricks = levelGeneration(this, this.level);

    this.bricks.forEach(brick => {
      brick.on(BREAK_EVENT, () => {
        this.bricks.splice(this.bricks.indexOf(brick), 1);

        if (this.bricks.length === 0) {
          this.win();
        }
      });
    });
  }

  win() {
    this.stop();
    this.level += 1;

    getApp()._options.globalData.currentLevel = this.level;
    getApp()._options.globalData.localStorage.set({
      currentLevel: this.level
    });

    hmApp.gotoPage({ url: 'page/gtr3-pro/victory/index' });
  }

  lose() {
    this.stop();
    hmApp.gotoPage({ url: 'page/gtr3-pro/loose/index' });
  }

  run() {
    // Check if level is not exist
    if (!isLevelExist(this.level)) {
      hmApp.gotoPage({ url: 'page/gtr3-pro/home/index' });
    }

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