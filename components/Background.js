export default class Background {
  constructor() {
    this.image = 'image/new-space.png';

    this.draw();
  }

  draw() {
    const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();

    this.widget = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: DEVICE_WIDTH,
      h: DEVICE_HEIGHT,
      pos_x: 0,
      pos_y: 0,
      center_x: this.width / 2,
      center_y: this.height / 2,
      src: this.image
    });
  }
}