import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../consts";
import Vector from "../utils/Vector";
const logger = DeviceRuntimeCore.HmLogger.getLogger('Space Breaker');

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

export function getMinMax(min, max, origMin, origMax, value) {
  const stepsCount = max - min; // 100 - 0 = 100
  const origStep = (origMax - origMin) / stepsCount; // 45 - (-45) / 100 = 90 / 100 = 0.9

  return origStep * value + origMin; // 0.9 * 0 + (-45) = -45
}

export function log(...args) {
  logger.debug(...args);
}

export function getCoorditatesAfterRotation({ position, angle, origin }) {
  return new Vector(
    (position.x - origin.x) * Math.cos(angle) - (position.y - origin.y) * Math.sin(angle) + origin.x,
    (position.x - origin.x) * Math.sin(angle) + (position.y - origin.y) * Math.cos(angle) + origin.y
  );
}

export function lineCircleCollision(line, circle) {
  // LINE IS AN OBJECT WITH TWO PROPS: "start" - Vector and "end" - Vector
  const startLineToEndLineVector = line.end.sub(line.start);
  const centerBallToStartLineVector = line.start.sub(circle.position);
  const centerBallToEndLineVector = line.end.sub(circle.position);

  // CHECK IF CLOSEST POINT IS START POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToStartLineVector.normalize()) > 0) {
    return {
      result: line.start.sub(circle.position).mag() < circle.radius,
      projectionPoint: line.start
    }
  }

  // CHECK IF CLOSEST POINT IS END POINT OF LINE
  if (Vector.dot(startLineToEndLineVector, centerBallToEndLineVector.normalize()) < 0) {
    return {
      result: line.end.sub(circle.position).mag() < circle.radius,
      projectionPoint: line.end
    }
  }

  const startLineToCenterBallVector = circle.position.sub(line.start);

  const projectionLength = Vector.dot(startLineToEndLineVector.normalize(), startLineToCenterBallVector);
  const projectionPoint = line.start.add(startLineToEndLineVector.setMag(projectionLength));

  return {
    result: projectionPoint.sub(circle.position).mag() < circle.radius,
    projectionPoint
  }
}

export function radiansToDegrees(radiansValue) {
  return radiansValue * (180 / Math.PI);
}