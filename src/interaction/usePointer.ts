import { useEffect, useRef } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { isKeyKind, pointerRoute, shouldTakeKey } from "./pointerRoute";

export interface PointerHandlers {
	onDown?: (position: Vector2) => void;
	onUp?: (position: Vector2) => void;
	onKey?: (input: InputObject) => void;
}

export interface UsePointerOptions {
	globalPointer?: boolean;
	keyboard?: boolean;
	captureProcessed?: boolean;
}

function isPointerButton(input: InputObject) {
	const kind = input.UserInputType;
	return kind === Enum.UserInputType.MouseButton1 || kind === Enum.UserInputType.Touch;
}

function positionOf(input: InputObject) {
	return new Vector2(input.Position.X, input.Position.Y);
}

export function usePointer(target: GuiObject | undefined, handlers: PointerHandlers, options: UsePointerOptions = {}) {
	const current = useRef(handlers);
	current.current = handlers;
	const route = pointerRoute(options.globalPointer);
	const captureProcessed = options.captureProcessed === true;

	useEffect(() => {
		if (route !== "local" || !target) return;
		const began = target.InputBegan.Connect((input) => {
			if (isPointerButton(input)) current.current.onDown?.(positionOf(input));
		});
		const ended = target.InputEnded.Connect((input) => {
			if (isPointerButton(input)) current.current.onUp?.(positionOf(input));
		});
		return () => {
			began.Disconnect();
			ended.Disconnect();
		};
	}, [target, route]);

	useEffect(() => {
		if (route !== "global") return;
		const began = UserInputService.InputBegan.Connect((input) => {
			if (isPointerButton(input)) current.current.onDown?.(positionOf(input));
		});
		const ended = UserInputService.InputEnded.Connect((input) => {
			if (isPointerButton(input)) current.current.onUp?.(positionOf(input));
		});
		return () => {
			began.Disconnect();
			ended.Disconnect();
		};
	}, [route]);

	useEffect(() => {
		if (options.keyboard !== true) return;
		const connection = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (!isKeyKind(input.UserInputType.Name)) return;
			if (!shouldTakeKey(gameProcessed, captureProcessed)) return;
			current.current.onKey?.(input);
		});
		return () => connection.Disconnect();
	}, [options.keyboard, captureProcessed]);
}
