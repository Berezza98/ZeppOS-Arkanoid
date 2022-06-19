import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";

export default class Background {
  constructor(game) {
    this.game = game;
    this.image = 'image/background.png';

    this.draw();
    this.addListeners();
  }

  addListeners() {
    this.widget.addEventListener(hmUI.event.CLICK_UP, (info) => {
      this.game.ball.start();
    });    
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