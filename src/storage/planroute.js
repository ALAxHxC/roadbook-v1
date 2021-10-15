export function createRouteStorage(routename, description) {
	localStorage.setItem(routename, description);
}
export function saveWaypointStorage(routename, number, data) {
	localStorage.setItem(`${routename}-${number}`, data);
}
