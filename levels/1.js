import Brick from "../components/Brick";
import { SCREEN_CENTER } from "../consts";


export default (game) => {
  const rect = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 0,
    horizontalMargins: 0,
    count: 1,
    inRow: 1,
  });

  const allBricks = [
    ...rect,
  ];

  return allBricks;
}