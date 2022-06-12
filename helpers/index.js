import Vector from "../utils/Vector";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();
const logger = DeviceRuntimeCore.HmLogger.getLogger('Star Wars');

export function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isOnTheField({ x, y }) {
  return x > 0 && x < DEVICE_WIDTH && y > 0 && y < DEVICE_HEIGHT;
}

export function getRandomFromArray(array) {
  return array[getRandom(0, array.length - 1)];
}

export function getMinMax(origMin, origMax, min, max, value) {
  const stepsCount = max - min; // 100 - 0 = 100
  const origStep = (origMax - origMin) / stepsCount; // 45 - (-45) / 100 = 90 / 100 = 0.9

  return origStep * value + origMin; // 0.9 * 0 + (-45) = -45
}

export function log(...args) {
  logger.debug(...args);
}

export function getCoorditatesAfterRotation({ x, y, angle, origin }) {
  return new Vector(
    (x - origin.x) * Math.cos(angle) - (y - origin.y) * Math.sin(angle) + origin.x,
    (x - origin.x) * Math.sin(angle) + (y - origin.y) * Math.cos(angle) + origin.y
  );
}