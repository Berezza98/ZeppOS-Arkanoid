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
    this.position = Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2).add(SCREEN_CENTER);

    this.addListeners();
  }

  addListeners() {
    hmApp.registerSpinEvent((key, degree) => {
      this.angle += Math.PI / 180 * degree;
    });
  }

  update() {
    if (this.widget) {
      this.position = Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2).add(SCREEN_CENTER);

      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
        angle: this.angle / (Math.PI / 180)
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
      angle: this.angle,
      mode: 'center'
    });
  }
}