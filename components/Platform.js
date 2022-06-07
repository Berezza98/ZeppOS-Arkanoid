import Vector from "../utils/Vector";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();
const SCREEN_CENTER = new Vector(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2);

export default class Platform {
  constructor() {
    this.width = 40;
    this.height = 10;
    this.angle = 0;
    this.position = Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2 - 40);

    this.addListeners();
  }

  addListeners() {
    hmApp.registerSpinEvent((key, degree) => {
      this.angle += Math.PI / 180 * degree;
    });
  }

  update() {
    if (this.widget) {
      this.position = Vector.fromAngle(this.angle).mult(DEVICE_WIDTH / 2 - 40);

      const finalPosition = SCREEN_CENTER.add(this.position).sub(new Vector(this.width / 2, this.height / 2));

      this.widget.setProperty(hmUI.prop.MORE, {
        x: finalPosition.x,
        y: finalPosition.y,
        angle: this.angle / (Math.PI / 180)
      });
      return;
    }

    this.draw();
  }

  draw() {
    const finalPosition = SCREEN_CENTER.add(this.position).sub(new Vector(this.width / 2, this.height / 2));

    this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: finalPosition.x,
      y: finalPosition.y,
      w: this.width,
      h: this.height,
      center_x: this.width / 2,
      center_y: this.height / 2,
      angle: this.angle,
      color: 0x0000FF
    });
  }
}