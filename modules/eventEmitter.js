export default class EventEmitter {
  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * subscribes to event
   * @param {string} event
   * @param {Function} callback
   */
  subscribe(event, callback) {
    const exists = this.subscriptions.has(event);
    if (!exists) {
      this.subscriptions.set(event, new Set());
    }
    this.subscriptions.get(event).add(callback);
  }

  /**
   * unsubscribes from event
   * @param {string} event
   * @param {Function} callback
   */
  unsubscribe(event, callback) {
    const exists = this.subscriptions.has(event);
    if (!exists) {
      console.warn(
        `[EventEmitter::unsubcribe] event "${event}" does not exist in emitter`
      );
      return;
    }
    if (!callback) {
      this.subscriptions.delete(event);
    } else {
      this.subscriptions.get(event).delete(callback);
    }
  }

  /**
   *
   * @param {string} event event to emit
   * @param  {...any[]} args args array for subscription callbacks
   * @returns
   */
  emit(event, ...args) {
    const exists = this.subscriptions.has(event);
    if (!exists) {
      console.warn(
        `[EventEmitter::emit] subscriptions for "${event}" do not exist`
      );
      return;
    }
    this.subscriptions.get(event).forEach((callback) => callback(...args));
  }

  static once(target, event) {
    return new Promise((resolve) => {
      target[event] = resolve;
    });
  }
}
