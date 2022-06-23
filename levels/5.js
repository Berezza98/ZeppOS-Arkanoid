import Brick from "../components/Brick";
import Vector from "../utils/Vector";
import { SCREEN_CENTER } from "../consts";

export default (game) => {

  const line1 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 2)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const line2 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 3)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 5,
    inRow: 5,
  });

  const horizontal = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 4)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 7,
    inRow: 7,
    brickOptions: {
      deathless: true
    }
  });

  const line3 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 5)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 5,
    inRow: 5,
  });

  const line4 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 6)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const allBricks = [
    ...line1,
    ...line2,
    ...horizontal,
    ...line3,
    ...line4
  ];

  return allBricks;
}