import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";

export default class Background {
  constructor(image) {
    this.image = image;

    this.draw();
  }

  onClick(handler) {
    this.widget.addEventListener(hmUI.event.CLICK_UP, handler);    
  }

  remove() {
    hmUI.deleteWidget(this.widget);
  }

  draw() {
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