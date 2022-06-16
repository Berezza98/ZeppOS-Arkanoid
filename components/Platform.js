import Vector from "../utils/Vector";
import Image from "./Image";
import { SCREEN_CENTER, DEVICE_WIDTH } from "../consts";
import { getCoorditatesAfterRotation, radiansToDegrees } from "../helpers";

export default class Platform {
  constructor() {
    this.widget = null;
    this.width = 100;
    this.height = 20;
    this.angle = Math.PI / 2;
    this.image = 'image/platform.png';

    this.addListeners();
  }

  get visibleAngle() {
    return this.angle + Math.PI / 2;
  }

  get position() {
    return Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2 - this.height).add(SCREEN_CENTER);
  }

  get coorditates() {
    const originalTopLeft = new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2);
    const originalTopRight = new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2);

    const start = getCoorditatesAfterRotation({
      x: originalTopLeft.x,
      y: originalTopLeft.y,
      origin: this.position,
      angle: this.angle - Math.PI / 2,
    });
    const end = getCoorditatesAfterRotation({
      x: originalTopRight.x,
      y: originalTopRight.y,
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