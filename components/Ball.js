import Vector from "../utils/Vector";

export default class Ball {
  constructor() {
    const { width, height } = hmSetting.getDeviceInfo();

    this.widget = null;
    this.angle = 0;
    this.image = 'image/circle.png';
    this.width = 64;
    this.height = 64;

    this.acceleration = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.position = new Vector((width / 2) - (this.width / 2), (height / 2) - (this.height / 2));

    this.addListeners();
  }

  addListeners() {
    // hmApp.registerSpinEvent((key, degree) => {
    //   this.angle += degree;
    // });

    hmApp.registerKeyEvent((key, action) => {
      if (action === hmApp.action.DOUBLE_CLICK) {
        this.acceleration = this.acceleration.add(new Vector(0, 1));
      }
    });

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
    const playerCenter = new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2);

    if (playerCenter.sub(screenCenter).mag() > width / 2 - this.width / 2) {
      const currentVector = playerCenter.sub(screenCenter).setMag(width / 2 - this.width / 2);
      this.position = screenCenter.add(currentVector).sub(new Vector(this.width / 2, this.height / 2));
    }
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    this.addFrictionForce();
    this.checkBorders();

    this.acceleration.set(0, 0);

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
        angle: this.angle
      });
      // this.widget.setProperty(hmUI.prop.y, this.position.y);
      // hmUI.deleteWidget(this.widget);
      return;
    }

    this.draw();
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.IMG, {
      x: this.position.x,
      y: this.position.y,
      w: this.width,
      h: this.height,
      pos_x: 0,
      pos_y: 0,
      center_x: this.width / 2,
      center_y: this.height / 2,
      src: this.image,
      angle: this.angle
    });

    // this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
    //   x: this.position.x,
    //   y: this.position.y,
    //   w: this.width,
    //   h: this.height,
    //   center_x: this.width / 2,
    //   center_y: this.height / 2,
    //   angle: this.angle,
    //   color: 0x0000FF
    // });
  }
}