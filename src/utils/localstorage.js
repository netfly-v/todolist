export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  has(key) {
    return Boolean(localStorage.getItem(key));
  },
  delete(key) {
    localStorage.removeItem(key);
  },
};
