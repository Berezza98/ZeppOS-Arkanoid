import { DEVICE_HEIGHT } from "../../../consts";

Page({
  build() {
    function play() {
      hmApp.gotoPage({
        url: 'page/gtr3-pro/game/index',
        param: JSON.stringify({
          id: '0',
          type: 'normal'
        })
      });
    }

    const button = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 100,
      y: DEVICE_HEIGHT - 200,
      w: 300,
      h: 100,
      text: 'Play',
      color: 0x00ffff,
      text_size: 30,
      normal_color: 0x262626,
      press_color: 0x292929,
      click_func: play
    });
  },
  onInit() {
    logger.debug('page onInit invoked')
  },

  onDestroy() {
    logger.debug('page onDestroy invoked')
  },
});