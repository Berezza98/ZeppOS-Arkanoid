export default class ImageText {
  constructor(fontRootPath, options) {
    const defaultOptions = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };

    this.options = Object.assign({}, defaultOptions, options);
    this.fontRootPath = fontRootPath;
    this.widget = null;
    this._text = '';
    this.fontArray = [
      fontRootPath + '/' + '0.png',
      fontRootPath + '/' + '1.png',
      fontRootPath + '/' + '2.png',
      fontRootPath + '/' + '3.png',
      fontRootPath + '/' + '4.png',
      fontRootPath + '/' + '5.png',
      fontRootPath + '/' + '6.png',
      fontRootPath + '/' + '7.png',
      fontRootPath + '/' + '8.png',
      fontRootPath + '/' + '9.png'
    ];

    this.draw();
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.TEXT, value);
    }
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      x: this.options.x - this.options.w / 2,
      y: this.options.y - this.options.h / 2,
      w: this.options.w,
      h: this.options.h,
      font_array: this.fontArray,
      text: this.text,
      align_h: hmUI.align.CENTER_H
    });
  }
}