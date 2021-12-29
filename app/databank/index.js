export const PROGRESS = {};
export const IN_PROGRESS = {};
export const DONE = {};

export function add(id) {
  IN_PROGRESS[id] = 0;
}

export function update(id, percent) {
  IN_PROGRESS[id] = percent;
}

export function complete(id) {
  delete IN_PROGRESS[id];
  DONE[id] = 100;
}

export function getProgress(id) {
  return IN_PROGRESS[id] || 0;
}

export function getDone() {
  return DONE;
}

export function getInProgress() {
  return IN_PROGRESS;
}

export function getAll() {
  return { ...getInProgress(), ...getDone() };
}

export default {
  add,
  update,
  getProgress,
  getDone,
  getInProgress,
  getAll,
  complete,
};
