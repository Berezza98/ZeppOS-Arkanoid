import { SCREEN_CENTER } from "../consts";
import { lineCircleCollision } from "../helpers";
import Vector from "../utils/Vector";

const HEALTH_COLORS = {
  1: 0xff0000,
  2: 0x0000ff,
  3: 0x00ff00
};

const SIZES_MAP = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
};

const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 15;

export default class Brick {
  constructor(game, x, y) {
    this.widget = null;
    this.game = game;
    this.position = new Vector(x, y);
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;
    this.angle = 0;
    this.health = 3;

    this.allWalls = {
      [SIZES_MAP.TOP]: { // TOP
        start: new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2)
      },
      [SIZES_MAP.LEFT]: { // LEFT
        start: new Vector(this.position.x - this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x - this.width / 2, this.position.y + this.height / 2)
      },
      [SIZES_MAP.BOTTOM]: { // BOTTOM
        start: new Vector(this.position.x - this.width / 2, this.position.y + this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2)
      },
      [SIZES_MAP.RIGHT]: { // RIGHT
        start: new Vector(this.position.x + this.width / 2, this.position.y - this.height / 2),
        end: new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2)
      },
    };
  }
  
  get isAlive() {
    return this.health > 0;
  }

  get diagonal() {
    return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
  }

  penetrationResolution(closestPointToThePlatform) {
    const penetrationVector = this.game.ball.position.sub(closestPointToThePlatform);
    this.game.ball.position = this.game.ball.position.add(penetrationVector.setMag(this.game.ball.width / 2 - penetrationVector.mag()));
  }

  hit() {
    this.health -= 1;
  }

  checkCollisionWithBall() {
    if (!this.game.ball.isFlying || this.game.ball.position.sub(this.position).mag() > this.diagonal / 2 + this.game.ball.radius) return;

    Object.keys(this.allWalls).forEach((wallName, index) => {
      const { result, projectionPoint } = lineCircleCollision(this.allWalls[wallName], this.game.ball);

      if (!result) return;

      this.penetrationResolution(projectionPoint);
      this.hit();

      switch (wallName) {
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

  update() {
    if (!this.isAlive) {
      this.widget.setProperty(hmUI.prop.VISIBLE, false);
      return;
    };

    this.checkCollisionWithBall();

    if (this.widget) {
      this.widget.setProperty(hmUI.prop.MORE, {
        color: HEALTH_COLORS[this.health]
      });

      return;
    }
    
    this.draw();
  }

  draw() {
    this.widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: this.position.x - this.width / 2,
      y: this.position.y - this.height / 2,
      w: this.width,
      h: this.height,
      color: HEALTH_COLORS[this.health]
    });
  }

  static generateField(game, op) {
    const options = Object.assign({}, {
      center: SCREEN_CENTER,
      verticalMargins: 20,
      horizontalMargins: 50,
      count: 20,
      inRow: 4,
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
      return new Brick(game, positionX, positionY)
    });

    return bricks;
  }
}