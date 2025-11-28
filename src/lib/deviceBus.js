export const DeviceBus = {
  listeners: new Set(),
  push(msg) {
    this.listeners.forEach((fn) => fn(msg));
  },
  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  },
};
