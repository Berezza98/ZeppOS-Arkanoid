import Vector from "../utils/Vector";

export const LOCAL_STORAGE_KEY = 'break-space.txt';

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();

export const SCREEN_CENTER = new Vector(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2);