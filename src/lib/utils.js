export const cls = (...arr) => arr.filter(Boolean).join(' ');

export const formatTime = (d) =>
  new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const uuid = () =>
  globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
