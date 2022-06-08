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
  const stepsCount = max - min;
  const origStep = (origMax - origMin) / stepsCount;

  return origStep * value;
}

export function log(...args) {
  logger.debug(...args);
}

export function rectCircleColliding(r, c){
  const circle = c.isCenterMode
  ? {
      ...c.options,
      x: c.options.x - c.options.w / 2,
      y: c.options.y - c.options.h / 2,
      r: c.options.w / 2
    }
  : {
    ...c.options,
    r: c.options.w / 2
  };

  const rect = r.isCenterMode
  ? {
      ...r.options,
      x: r.options.x - r.options.w / 2,
      y: r.options.y - r.options.h / 2,
    }
  : {
    ...r.options,
  };

  const distX = Math.abs(circle.x - rect.x - rect.w / 2);
  const distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > (rect.w / 2 + circle.r)) return false;
  if (distY > (rect.h / 2 + circle.r)) return false;

  if (distX <= (rect.w / 2)) return true;
  if (distY <= (rect.h / 2)) return true;

  const dx = distX - rect.w / 2;
  const dy = distY - rect.h / 2;

  return dx * dx + dy * dy <= circle.r * circle.r;
}