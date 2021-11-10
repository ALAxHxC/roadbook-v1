export function savePoint(routename, number, data) {
  localStorage.setItem(`${routename}-${number}`, data);
}
