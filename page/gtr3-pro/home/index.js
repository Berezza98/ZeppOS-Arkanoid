import Background from "../../../components/Background";
import Button from "../../../components/Button";
import ImageText from "../../../components/ImageText";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../consts";
import { isLevelExist } from "../../../helpers/levels";

Page({
  build() {
    const currentLevel = getApp()._options.globalData.currentLevel;

    const bg = new Background('image/startscreen.png');
    const levelText = new ImageText('levelNumbers', {
      x: DEVICE_WIDTH / 2,
      y: DEVICE_HEIGHT / 2 - 8,
      w: 100,
      h: 50
    });

    levelText.text = currentLevel.toString();

    if (isLevelExist(currentLevel)) {
      const playBtn = new Button({
        x: DEVICE_WIDTH / 2,
        y: DEVICE_HEIGHT - 100,
        w: 200,
        h: 50,
        normal_src: 'image/play-button.png',
        press_src: 'image/play-button-pressed.png',
        click_func: () => {
          hmApp.gotoPage({ url: 'page/gtr3-pro/game/index' });
        }
      });
    }
  },
  onInit() {

  },

  onDestroy() {

  },
});