import { getRandom } from "../helpers";

export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static random() {
    const length = 1;
    const angle = Math.random() * Math.PI * 2;
    return new Vector(length * Math.cos(angle), length * Math.sin(angle));
  }

  static fromAngle(angle) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    const { x, y } = this;
    return new Vector(x, y);
  }

  add(vector2) {
    const { x, y } = vector2;

    return new Vector(this.x + x, this.y + y);
  }

  sub(vector2) {
    const { x, y } = vector2;

    return new Vector(this.x - x, this.y - y);
  }

  mult(value) {
    const { x, y } = this;

    return new Vector(x * value, y * value);
  }

  mag() {
    const { x, y } = this;

    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }

  setMag(value) {
    return this.normalize().mult(value);
  }

  normalize() {
    const { x, y } = this;
    const mag = this.mag();

    if (mag === 0) return new Vector();

    return new Vector(x / mag, y / mag);
  }

  heading() {
    const { x, y } = this;

    return Math.atan2(y, x);
  }

  setMinLimit(vector2) {
    const { x, y } = vector2;

    const minX = this.x >= x ? this.x : x;
    const minY = this.y >= y ? this.y : y;

    return new Vector(minX, minY);
  }

  setMaxLimit(vector2) {
    const { x, y } = vector2;

    const maxX = this.x <= x ? this.x : x;
    const maxY = this.y <= y ? this.y : y;

    return new Vector(maxX, maxY);
  }

  limit(value) {
    if (this.mag() > value) {
      return this.setMag(value);
    }

    return this.clone();
  }
}