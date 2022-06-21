import Background from "../../../components/Background";
import Button from "../../../components/Button";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../consts";

Page({
  build() {
    const bg = new Background('image/victory-background.png');

    const nextBtn = new Button({
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT - 100,
      w: 200,
      h: 50,
      normal_src: 'image/next-button.png',
      press_src: 'image/next-button-pressed.png',
      click_func: () => {
        hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
      }
    });
  },
  onInit() {

  },

  onDestroy() {

  },
});