import Brick from "../components/Brick";
import Vector from "../utils/Vector";
import { SCREEN_CENTER } from "../consts";

export default (game) => {
  const leftSide = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(100, 0)),
    verticalMargins: 15,
    horizontalMargins: 0,
    count: 6,
    inRow: 1,
  });

  const rightSide = Brick.generateField(game, {
    center: SCREEN_CENTER.add(new Vector(100, 0)),
    verticalMargins: 15,
    horizontalMargins: 0,
    count: 6,
    inRow: 1,
  });

  const topSide = Brick.generateField(game, {
    center: SCREEN_CENTER.sub(new Vector(0, 68)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 3,
    inRow: 3,
  });

  const bottomSide = Brick.generateField(game, {
    center: SCREEN_CENTER.add(new Vector(0, 68)),
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 3,
    inRow: 3,
  });

  const allBricks = [
    ...leftSide,
    ...rightSide,
    ...topSide,
    ...bottomSide
  ];

  return allBricks;
}