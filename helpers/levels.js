import { levels } from "../levels"

export const isLevelExist = level => {
  return levels.hasOwnProperty(level);
}