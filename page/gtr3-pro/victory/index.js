Page({
  build() {
    const text = hmUI.createWidget(hmUI.widget.TEXT, {
      text: 'VICTORY',
      x: 42,
      y: 200,
      w: DEVICE_WIDTH,
      h: 100,
      color: 0xffffff,
      text_size: 36,
      align_h: hmUI.align.CENTER_H,
      text_style: hmUI.text_style.WRAP,
    });
  },
  onInit() {

  },

  onDestroy() {
    game.stop();
  },
});