import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER } from "../consts";
import { lineCircleCollision } from "../helpers";

const BALL_IMAGES = {
  1: 'cyan-ball',
  2: 'orange-ball',
  3: 'orange-ball',
  4: 'cyan-ball',
  5: 'cyan-ball',
  6: 'green-ball',
  7: 'orange-ball',
  8: 'cyan-ball',
  9: 'cyan-ball'
};

export default class Ball {
  constructor(game) {
    this.game = game;
    this.isFlying = false;
    this.widget = null;
    this.image = `level-balls/${BALL_IMAGES[this.game.level]}.png`;
    this.width = 20;
    this.height = 20;
    this.maxSpeed = 6;

    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = this.positionOnThePlatform;
  }

  get positionOnThePlatform() {
    return this.game.platform.position.add(SCREEN_CENTER.sub(this.game.platform.position).setMag(this.game.platform.height / 2 + this.height / 2));
  }

  get radius() {
    return this.width / 2;
  }

  checkDeviceBorders() {
    const { width } = hmSetting.getDeviceInfo();

    if (this.position.sub(SCREEN_CENTER).mag() <= width / 2 + this.width / 2) return;

    this.isFlying = false;
    this.velocity.set(0, 0);
    this.position = this.positionOnThePlatform;
    this.game.platform.die();
  }

  platformPenetrationResolution(closestPointToThePlatform) {
    const penetrationVector = this.position.sub(closestPointToThePlatform);
    this.position = this.position.add(penetrationVector.setMag(this.width / 2 - penetrationVector.mag()));
  }

  checkPlatformCollision() {
    if (!this.isFlying) return;

    const { result, projectionPoint } = lineCircleCollision(this.game.platform.coorditates, this);

    const fromCenterToBall = this.position.sub(SCREEN_CENTER).mag();
    const fromCenterToPenetrationPoint = projectionPoint.sub(SCREEN_CENTER).mag();

    if (!result || (result && fromCenterToBall > fromCenterToPenetrationPoint)) return;

    this.platformPenetrationResolution(projectionPoint);

    // WE NEED TO FIND ANGLE BETWEEN PLATFORM AND BALL VELOCITY VECTOR
    const v1 = this.velocity.mult(-1);
    const v2 = this.game.platform.coorditates.start.sub(projectionPoint);

    const platformAngle = this.game.platform.coorditates.end.sub(this.game.platform.coorditates.start).heading();
    const angle = Vector.angleBetween(v1, v2);
    const newAngle = platformAngle - angle;
    this.velocity = Vector.fromAngle(newAngle).setMag(this.maxSpeed);
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