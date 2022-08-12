export default class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, handler) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(handler);
  }

  emit(eventName, data) {
    this._events[eventName]?.forEach(handler => handler(data));
  }
}