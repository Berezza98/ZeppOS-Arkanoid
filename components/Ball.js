import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER, DEVICE_WIDTH } from "../consts";
import { log, rectCircleColliding } from "../helpers";

export default class Ball {
  constructor(game) {
    this.game = game;
    this.isFlying = false;
    this.widget = null;
    this.image = 'image/game-ball.png';
    this.width = 32;
    this.height = 32;
    this.maxSpeed = 4;

    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = this.positionOnThePlatform;

    this.addListeners();
  }

  get positionOnThePlatform() {
    return this.game.platform.position.add(SCREEN_CENTER.sub(this.game.platform.position).setMag(this.game.platform.height / 2 + this.height / 2));
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

  checkDeviceBorders() {
    const { width, height } = hmSetting.getDeviceInfo();

    if (this.position.sub(SCREEN_CENTER).mag() > width / 2 + this.width / 2) {
      this.isFlying = false;
      this.velocity.set(0, 0);
      this.position = this.positionOnThePlatform;
    }
  }

  checkPlatformCollision() {
    if (!rectCircleColliding(this.game.platform.widget, this.widget)) return;
    
    log('COLLISION');
  }

  start() {
    if (this.isFlying) return;

    this.isFlying = true;
    this.acceleration = SCREEN_CENTER.sub(this.position).setMag(this.maxSpeed);
  }

  update() {
    if (this.isFlying) {
      this.velocity = this.velocity.add(this.acceleration);
      this.position = this.position.add(this.velocity);

      this.checkDeviceBorders();
      this.checkPlatformCollision();
  
      this.acceleration.set(0, 0);
    } else {
      this.position = this.positionOnThePlatform;
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