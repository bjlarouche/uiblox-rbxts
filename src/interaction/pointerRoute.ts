export type PointerRoute = "local" | "global";

/** Global pointer replaces local GuiObject events. Never both. */
export function pointerRoute(globalPointer?: boolean): PointerRoute {
	return globalPointer === true ? "global" : "local";
}

const GAMEPADS = new Set(["Gamepad1", "Gamepad2", "Gamepad3", "Gamepad4", "Gamepad5", "Gamepad6", "Gamepad7", "Gamepad8"]);

export function isKeyKind(name: string) {
	return name === "Keyboard" || GAMEPADS.has(name);
}

/** Processed keys are ignored unless the caller opts into them. */
export function shouldTakeKey(gameProcessed: boolean, captureProcessed = false) {
	return captureProcessed || !gameProcessed;
}
