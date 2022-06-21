import Brick from "../components/Brick";
import { SCREEN_CENTER } from "../consts";


export default (game) => {
  const rect = Brick.generateField(game, {
    center: SCREEN_CENTER,
    verticalMargins: 15,
    horizontalMargins: 15,
    count: 9,
    inRow: 3,
  });

  const allBricks = [
    ...rect,
  ];

  return allBricks;
}