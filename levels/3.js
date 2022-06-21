import Brick from "../components/Brick";
import Vector from "../utils/Vector";
import { SCREEN_CENTER } from "../consts";

export default (game) => {
  const firstLine = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 70)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 1,
    inRow: 1,
  });

  const secondLine = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 70)).add(new Vector(0, 27 * 1)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 2,
    inRow: 2,
  });

  const thirdLine = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 70)).add(new Vector(0, 27 * 2)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 3,
    inRow: 3,
  });

  const fourthLine = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 70)).add(new Vector(0, 27 * 3)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const fifthLine = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 70)).add(new Vector(0, 27 * 4)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 5,
    inRow: 5,
  });

  const allBricks = [
    ...firstLine,
    ...secondLine,
    ...thirdLine,
    ...fourthLine,
    ...fifthLine
  ];

  return allBricks;
}