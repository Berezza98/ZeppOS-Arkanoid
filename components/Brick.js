import Image from "./Image";
import { SCREEN_CENTER } from "../consts";
import { getCoorditatesAfterRotation, lineCircleCollision } from "../helpers";
import Vector from "../utils/Vector";
import EveneEmitter from "../utils/EventEmitter";

const DEATHLESS_COLOR = 'DEATHLESS_COLOR';

const HEALTH_IMAGES = {
  1: 'image/red-brick.png',
  2: 'image/yellow-brick.png',
  3: 'image/green-brick.png'
};

const HEALTH_COLORS = {
  1: 0xff0000,
  2: 0x0000ff,
  3: 0x00ff00,
  [DEATHLESS_COLOR]: 0xaaa9ad
};

const SIZES_MAP = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
};

const BRICK_WIDTH = 34;
const BRICK_HEIGHT = 12;

export const BREAK_EVENT = 'BREAK_EVENT';

export default class Brick extends EveneEmitter {
  constructor(game, x, y, options) {
    super();

    const defaultOptions = {
      health: 3,
      deathless: false
    };

    this.options = Object.assign({}, defaultOptions, options);

    this.widget = null;
    this.game = game;
    this.position = new Vector(x, y);
    this.initPosition = this.position.clone();
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;
    this.angle = 0;
    this.deathless = this.options.deathless;
    this.health = this.options.health;
  }

  get dynamic() {
    return this._dynamic;
  }

  set dynamic(value) {
    this._dynamic = value;
  }

  get frameChangeAngle() {
    return this._frameChangeAngle;
  }

  set frameChangeAngle(value) {
    if (!value) return;

    this._frameChangeAngle = value;
  }
  
  get isAlive() {
    if (this.deathless) return true;

    return this.health > 0;
  }

  get diagonal() {
    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
  }

  getAllWalls() {
    return {
      [SIZES_MAP.TOP]: { // TOP
        start: new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2)
      },
      [SIZES_MAP.LEFT]: { // LEFT
        start: new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x - this.width / 2, this.position.y + this.height / 2)
      },
      [SIZES_MAP.RIGHT]: { // RIGHT
        start: new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2)
      },
      [SIZES_MAP.BOTTOM]: { // BOTTOM
        start: new Vector(this.position.x - this.width / 2, this.position.y + this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2)
      },
    }; 
  }

  penetrationResolution(closestPointToThePlatform) {
    const penetrationVector = this.game.ball.position.sub(closestPointToThePlatform);
    this.game.ball.position = this.game.ball.position.add(penetrationVector.setMag(this.game.ball.radius - penetrationVector.mag()));
  }

  hit() {
    this.health -= 1;

    if (!this.isAlive) {
      
      // FOR IMAGES
      // this.widget.remove();

      this.widget.setProperty(hmUI.prop.VISIBLE, false);
      // hmUI.deleteWidget(this.widget);
      this.emit(BREAK_EVENT);
    }

    this.widget.setProperty(hmUI.prop.MORE, {
      color: HEALTH_COLORS[this.deathless ? DEATHLESS_COLOR : this.health]
    });

    // FOR IMAGES
    // this.widget.setSrc(HEALTH_IMAGES[this.health]);
  }

  canUseCollision(wallName) {
    const { x, y } = this.game.ball.velocity;

    switch (wallName) {
      case SIZES_MAP.RIGHT:
        return (x < 0 && y > 0) || (x < 0 && y < 0) || (x < 0 && y === 0);
      case SIZES_MAP.LEFT:
        return (x > 0 && y > 0) || (x > 0 && y < 0) || (x > 0 && y === 0);
      case SIZES_MAP.TOP:
        return (x > 0 && y > 0) || (x < 0 && y > 0) || (x === 0 && y > 0);
      case SIZES_MAP.BOTTOM:
        return (x > 0 && y < 0) || (x < 0 && y < 0) || (x === 0 && y < 0);
      default:
        return false;
    }
  }

  checkCollisionWithBall() {
    if (!this.game.ball.isFlying || this.game.ball.position.sub(this.position).mag() >= this.diagonal / 2 + this.game.ball.radius) return;

    const collidedSides = [];

    const allWalls = this.getAllWalls();

    Object.keys(allWalls).forEach((wallName) => {
      const { result, projectionPoint } = lineCircleCollision(allWalls[wallName], this.game.ball);

      if (result && this.canUseCollision(wallName)) {
        collidedSides.push({
          projectionPoint,
          wallName
        });
      }
    });

    if (collidedSides.length === 0) return;

    this.penetrationResolution(collidedSides[0].projectionPoint);
    this.hit();

    collidedSides.forEach(side => {
      switch (side.wallName) {
        case SIZES_MAP.RIGHT:
        case SIZES_MAP.LEFT:
          this.game.ball.velocity.x = -this.game.ball.velocity.x;
          break;
        case SIZES_MAP.TOP:
        case SIZES_MAP.BOTTOM:
          this.game.ball.velocity.y = -this.game.ball.velocity.y;
          break;
      }
    });
  }

  changePosition() {
    if (!this.dynamic) return;

    this.angle += this.frameChangeAngle;

    this.position = getCoorditatesAfterRotation({
      position: this.initPosition,
      angle: this.angle,
      origin: SCREEN_CENTER
    });
  }

  update() {
    this.checkCollisionWithBall();

    if (!this.widget) return this.draw();

    this.changePosition();
    
    if (this.dynamic) {
      this.widget.setProperty(hmUI.prop.MORE, {
        x: this.position.x,
        y: this.position.y,
      });
    }
  }

  draw() {
    // FOR IMAGES
    // this.widget = new Image({
    //   x: this.position.x,
    //   y: this.position.y,
    //   w: this.width,
    //   h: this.height,
    //   src: HEALTH_IMAGES[this.health],
    //   mode: 'center'
    // });

    this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: this.position.x - this.width / 2,
      y: this.position.y - this.height / 2,
      w: this.width,
      h: this.height,
      color: HEALTH_COLORS[this.deathless ? DEATHLESS_COLOR : this.health]
    });
  }

  static generateField(game, op) {
    const options = Object.assign({}, {
      center: SCREEN_CENTER,
      verticalMargins: 15,
      horizontalMargins: 15,
      count: 30,
      inRow: 6,
      dynamic: {
        enabled: false
      },
      brickOptions: {
        health: 3,
        deathless: false
      }
    }, op);

    const rowCount = Math.ceil(options.count / options.inRow);

    const width = (BRICK_WIDTH * options.inRow) + (options.horizontalMargins * (options.inRow - 1));
    const height = (BRICK_HEIGHT * rowCount) + (options.verticalMargins * (rowCount - 1));

    const initialPosition = options.center.sub(new Vector(width / 2 - BRICK_WIDTH / 2, height / 2 - BRICK_HEIGHT / 2));

    const bricks = new Array(options.count).fill(null).map((el, index) => {
      const column = index % options.inRow;
      const row = Math.floor(index / options.inRow);

      const positionX = initialPosition.x + (column * (BRICK_WIDTH + options.horizontalMargins));
      const positionY = initialPosition.y + (row * (BRICK_HEIGHT + options.verticalMargins));
      const brick = new Brick(game, positionX, positionY, options.brickOptions);

      if (options?.dynamic?.enabled) {
        brick.dynamic = true;
        brick.frameChangeAngle = options.dynamic.frameChangeAngle;
      }

      return brick;
    });

    return bricks;
  }
}