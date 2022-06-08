import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER, DEVICE_WIDTH } from "../consts";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.isFlying = false;
    this.widget = null;
    this.image = 'image/game-ball.png';
    this.width = 32;
    this.height = 32;

    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = this.game.platform.position.add(SCREEN_CENTER.sub(this.game.platform.position).setMag(this.game.platform.height / 2 + this.height / 2));

    this.addListeners();
  }

  addListeners() {
    hmApp.registerGestureEvent((event) => {
      switch (event) {
        case hmApp.gesture.UP:
          this.acceleration = new Vector(0, -10);
          break
        case hmApp.gesture.DOWN:
          this.acceleration = new Vector(0, 10);
          break
        case hmApp.gesture.LEFT:
          this.acceleration = new Vector(-10, 0);
          break
        case hmApp.gesture.RIGHT:
          this.acceleration = new Vector(10, 0);
          break
        default:
          break
      }

      return true;
    });
  }

  addFrictionForce() {
    this.velocity = this.velocity.mult(0.95);
  }

  checkBorders() {
    const { width, height } = hmSetting.getDeviceInfo();

    const screenCenter = new Vector(width / 2, height / 2);

    if (this.position.sub(screenCenter).mag() > width / 2 - this.width / 2) {
      const currentVector = this.position.sub(screenCenter).setMag(width / 2 - this.width / 2);
      this.position = screenCenter.add(currentVector);
    }
  }

  update() {
    if (this.isFlying) {
      this.velocity = this.velocity.add(this.acceleration);
      this.position = this.position.add(this.velocity);
  
      // this.addFrictionForce();
      // this.checkBorders();
  
      this.acceleration.set(0, 0);
    } else {
      this.position = this.game.platform.position.add(SCREEN_CENTER.sub(this.game.platform.position).setMag(this.game.platform.height / 2 + this.height / 2));
    }

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
      });

      return;
    }

    this.draw();
  }

  draw() {
    this.widget = new Image({
      x: this.position.x,
      y: this.position.y,
      w: this.width,
      h: this.height,
      src: this.image,
      mode: 'center'
    });
  }
}