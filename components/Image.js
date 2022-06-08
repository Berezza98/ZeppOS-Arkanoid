import Vector from "../utils/Vector";

export default class Image {
  constructor(config) {
    const defaultConfig = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      src: '',
      angle: 0,
      mode: 'corner', // DEFAULT TOP LEFT CORNDER X and Y (ALSO POSSIBLE "center" VALUE)
    };

    this.widget = null;
    this.options = Object.assign({}, defaultConfig, config);
    this.widgetSize = Math.max(this.options.w, this.options.h);
    this.realPosition = this.isCenterMode
      ? new Vector(this.options.x - (this.widgetSize / 2), this.options.y - (this.widgetSize / 2))
      : new Vector(this.options.x - ((this.widgetSize - this.options.w) / 2), this.options.y - ((this.widgetSize - this.options.h) / 2));
  
    this.draw();
  }

  get isCenterMode() {
    return this.options.mode.toLowerCase() === 'center';
  }

  setProperty(propName, value) {
    const updates = this.isCenterMode ? this.transformCenter(value) : value;

    this.options = {
      ...this.options,
      ...updates
    };

    this.widget.setProperty(propName, updates);
  }

  transformCenter(value) {
    const copy = Object.assign({}, value);

    return {
      ...copy,
      x: copy.x - this.widgetSize / 2,
      y: copy.y - this.widgetSize / 2,
    }
  }

  draw() {
    const { src, angle } = this.options;

    this.widget = hmUI.createWidget(hmUI.widget.IMG, {
      x: this.realPosition.x,
      y: this.realPosition.y,
      w: this.widgetSize,
      h: this.widgetSize,
      pos_x: (this.widgetSize - this.options.w) / 2,
      pos_y: (this.widgetSize - this.options.h) / 2,
      center_x: this.widgetSize / 2,
      center_y: this.widgetSize / 2,
      src,
      angle
    });
  }
}