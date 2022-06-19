export default class Button {
  constructor(options) {
    const defaultOptions = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      normal_src: null,
      press_src: null
    };

    this.options = Object.assign({}, defaultOptions, options);
    this.widget = null;
    this._text = undefined;

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
    const { x, y, w, h } = this.options;

    this.widget = hmUI.createWidget(hmUI.widget.BUTTON, {
      ...this.options,
      x: x - w / 2,
      y: y - h / 2,
    });
  }
}