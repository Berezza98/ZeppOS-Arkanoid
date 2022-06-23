import Brick from "../components/Brick";
import Vector from "../utils/Vector";
import { DEVICE_WIDTH, SCREEN_CENTER } from "../consts";

export default (game) => {


  const rectTop = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 15,
    horizontalMargins: 15,
    count: 1,
    inRow: 1,
    dynamic: {
      enabled: true,
      frameChangeValue: (Math.PI / 180) * 1,
      rotate: false,
      translate: true,
      min: new Vector(100, 200),
      max: new Vector(DEVICE_WIDTH - 100, 200),
    }
  });


  const rectBot = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 15,
    horizontalMargins: 15,
    count: 1,
    inRow: 1,
    dynamic: {
      enabled: true,
      frameChangeValue: (Math.PI / 180) * 1,
      rotate: false,
      translate: true,
      min: new Vector(100, DEVICE_WIDTH - 200),
      max: new Vector(DEVICE_WIDTH - 100, DEVICE_WIDTH - 200),
    }
  });

  const line1 = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 0,
    horizontalMargins: 15,
    count: 4,
    inRow: 4,
  });

  const allBricks = [
    ...rectTop,
    ...rectBot,
    ...line1
  ];

  return allBricks;
}