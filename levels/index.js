import level1 from './1.js';
import level2 from './2.js';
import level3 from './3.js';
import level4 from './4.js';

export const levels = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
}

export default function levelGeneration(game, levelNumber) {
  return levels[levelNumber](game);
}