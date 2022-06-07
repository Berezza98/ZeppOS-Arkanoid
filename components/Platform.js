import Vector from "../utils/Vector";
import Image from "./Image";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();
const SCREEN_CENTER = new Vector(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2);

export default class Platform {
  constructor() {
    this.widget = null;
    this.width = 100;
    this.height = 20;
    this.angle = 0;
    this.image = 'image/platform.png';

    this.addListeners();
  }

  get visibleAngle() {
    return this.angle / (Math.PI / 180) + 90;
  }

  get position() {
    return Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2 - this.height).add(SCREEN_CENTER);
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
        angle: this.visibleAngle
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
      angle: this.visibleAngle,
      mode: 'center'
    });
  }
}