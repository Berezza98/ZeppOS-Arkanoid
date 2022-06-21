import Brick from "../components/Brick";
import { SCREEN_CENTER } from "../consts";


export default (game) => {
  const rect = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 15,
    horizontalMargins: 15,
    count: 9,
    inRow: 3,
    dynamic: {
      enabled: true,
      frameChangeAngle: (Math.PI / 180) * 1
    }
  });

  const allBricks = [
    ...rect,
  ];

  return allBricks;
}