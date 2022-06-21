import Brick from "../components/Brick";
import Vector from "../utils/Vector";
import { SCREEN_CENTER } from "../consts";

export default (game) => {
  const line1 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 1,
    inRow: 1,
  });

  const line2 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 1)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 2,
    inRow: 2,
  });

  const line3 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 2)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 3,
    inRow: 3,
  });

  const line4 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 3)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const line5 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 4)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 5,
    inRow: 5,
  });

  const line6 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 5)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const line7 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 6)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 3,
    inRow: 3,
  });

  const line8 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 7)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 2,
    inRow: 2,
  });

  const line9 = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 100)).add(new Vector(0, 27 * 8)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 1,
    inRow: 1,
  });

  const allBricks = [
    ...line1,
    ...line2,
    ...line3,
    ...line4,
    ...line5,
    ...line6,
    ...line7,
    ...line8,
    ...line9
  ];

  return allBricks;
}