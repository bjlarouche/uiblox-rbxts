/** True when the pointer is still over the host, including a child pin. */
export function pointerInside(originX: number, originY: number, width: number, height: number, x: number, y: number) {
	if (x !== x || y !== y) return false;
	return x >= originX && y >= originY && x <= originX + width && y <= originY + height;
}
