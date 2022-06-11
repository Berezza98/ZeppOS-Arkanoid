import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER, DEVICE_WIDTH } from "../consts";
import { log } from "../helpers";

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
    const { width } = hmSetting.getDeviceInfo();

    if (this.position.sub(SCREEN_CENTER).mag() > width / 2 + this.width / 2) {
      this.isFlying = false;
      this.velocity.set(0, 0);
      this.position = this.positionOnThePlatform;
    }
  }

  getClosestPointToThePlatform() {
    const platformCoordinates = this.game.platform.coorditates;

    const startPlatformToEndPlatformVector = platformCoordinates.end.sub(platformCoordinates.start);
    const centerBallToStartPlatformVector = platformCoordinates.start.sub(this.position);
    const centerBallToEndPlatformVector = platformCoordinates.end.sub(this.position);

    // CHECK IF CLOSEST POINT IS START POINT OF PLATFORM
    if (Vector.dot(startPlatformToEndPlatformVector, centerBallToStartPlatformVector.normalize()) > 0) {
      return platformCoordinates.start;
    }

    // CHECK IF CLOSEST POINT IS END POINT OF PLATFORM
    if (Vector.dot(startPlatformToEndPlatformVector, centerBallToEndPlatformVector.normalize()) < 0) {
      return platformCoordinates.end;
    }

    const startPlatformToCenterBallVector = this.position.sub(platformCoordinates.start);

    const projectionLength = Vector.dot(startPlatformToEndPlatformVector.normalize(), startPlatformToCenterBallVector);
    const projectionPoint = platformCoordinates.start.add(startPlatformToEndPlatformVector.setMag(projectionLength));
    
    return projectionPoint;
  }

  checkPlatformCollision() {
    if (!this.isFlying) return;

    const closestPointToThePlatform = this.getClosestPointToThePlatform();

    this.point.setProperty(hmUI.prop.MORE, {
      x: closestPointToThePlatform.x,
      y: closestPointToThePlatform.y,
    });

    if (closestPointToThePlatform.sub(this.position).mag() <= this.width / 2) {
      log('COLLISION');
      this.velocity = this.velocity.mult(-1);
    }
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

      this.point2.setProperty(hmUI.prop.MORE, {
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

    this.point = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      color: 0xFF0000
    });

    this.point2 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 3,
      h: 3,
      color: 0x00FF00
    });
  }
}