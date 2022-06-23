import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER, DEVICE_WIDTH } from "../consts";
import { getCoorditatesAfterRotation, radiansToDegrees } from "../helpers";
import EveneEmitter from "../utils/EventEmitter";

export const DIED_EVENT = 'DIED_EVENT';

export default class Platform extends EveneEmitter {
  constructor() {
    super();

    this.widget = null;
    this.width = 70;
    this.height = 12;
    this.angle = Math.PI / 2;
    this.lives = 3;

    this.addListeners();
  }

  get image() {
    return `platform/${this.lives}.png`;
  }

  get visibleAngle() {
    return this.angle + Math.PI / 2;
  }

  get position() {
    return Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2 - this.height).add(SCREEN_CENTER);
  }

  get isDied() {
    return this.lives <= 0;
  }

  get coorditates() {
    const originalTopLeft = new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2);
    const originalTopRight = new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2);

    const start = getCoorditatesAfterRotation({
      position: originalTopLeft,
      origin: this.position,
      angle: this.angle - Math.PI / 2,
    });
    const end = getCoorditatesAfterRotation({
      position: originalTopRight,
      origin: this.position,
      angle: this.angle - Math.PI / 2,
    });

    return { start, end };
  }

  addListeners() {
    hmApp.registerSpinEvent((key, degree) => {
      this.angle += Math.PI / 180 * degree;

      return true;
    });
  }

  die() {
    this.lives -= 1;

    if (this.isDied) return this.emit(DIED_EVENT);

    this.widget.remove();
    this.draw();
  }

  update() {
    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
        angle: radiansToDegrees(this.visibleAngle)
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
      angle: radiansToDegrees(this.visibleAngle),
      mode: 'center'
    });
  }
}