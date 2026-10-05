import { useEffect, useRef, useState } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import {
	DRAG_SCROLL_THRESHOLD,
	canvasScrollMax,
	isDragScrollPress,
	nextCanvasPosition,
	pointerInFrame,
	scrollAxis,
	shouldBeginDragScroll,
} from "./dragScroll";

export interface DragScrollHandle {
	dragging: boolean;
	suppressClick: () => boolean;
}

export function useDragScroll(frame?: ScrollingFrame): DragScrollHandle {
	const [dragging, setDragging] = useState(false);
	const tookRef = useRef(false);
	const draggingRef = useRef(false);

	useEffect(() => {
		if (!frame) return;

		let tracking = false;
		let startPointer = new Vector2(0, 0);
		let startCanvas = new Vector2(0, 0);
		let restBar = frame.ScrollBarImageTransparency;
		const activeInput = { current: undefined as InputObject | undefined };

		const finish = (consumed: boolean) => {
			if (!tracking && !draggingRef.current) return;
			tracking = false;
			activeInput.current = undefined;
			if (draggingRef.current) {
				draggingRef.current = false;
				setDragging(false);
				frame.ScrollBarImageTransparency = restBar;
				tookRef.current = consumed;
			}
		};

		const began = UserInputService.InputBegan.Connect((input) => {
			// Gui rows mark input processed; still allow content drag from those hits.
			if (!isDragScrollPress(input) || !frame.ScrollingEnabled) return;
			if (!pointerInFrame(frame, input.Position)) return;
			const box = UserInputService.GetFocusedTextBox();
			if (box && pointerInFrame(box, input.Position)) return;
			const max = canvasScrollMax(frame);
			const axis = scrollAxis(frame.ScrollingDirection);
			if (axis === "x" && max.X <= 0) return;
			if (axis === "y" && max.Y <= 0) return;
			if (axis === "xy" && max.X <= 0 && max.Y <= 0) return;
			tracking = true;
			tookRef.current = false;
			activeInput.current = input;
			startPointer = new Vector2(input.Position.X, input.Position.Y);
			startCanvas = frame.CanvasPosition;
			restBar = frame.ScrollBarImageTransparency;
		});

		const changed = UserInputService.InputChanged.Connect((input) => {
			if (!tracking || activeInput.current === undefined) return;
			if (
				input.UserInputType !== Enum.UserInputType.MouseMovement &&
				input.UserInputType !== Enum.UserInputType.Touch
			) {
				return;
			}
			const pointer = new Vector2(input.Position.X, input.Position.Y);
			const axis = scrollAxis(frame.ScrollingDirection);
			if (!draggingRef.current) {
				if (!shouldBeginDragScroll(startPointer, pointer, axis, DRAG_SCROLL_THRESHOLD)) return;
				draggingRef.current = true;
				setDragging(true);
				frame.ScrollBarImageTransparency = 0;
			}
			frame.CanvasPosition = nextCanvasPosition(startCanvas, startPointer, pointer, axis, canvasScrollMax(frame));
		});

		const ended = UserInputService.InputEnded.Connect((input) => {
			const press = activeInput.current;
			if (press === undefined) return;
			if (input !== press && input.UserInputType !== press.UserInputType) return;
			finish(draggingRef.current);
		});

		return () => {
			began.Disconnect();
			changed.Disconnect();
			ended.Disconnect();
			if (draggingRef.current) frame.ScrollBarImageTransparency = restBar;
			draggingRef.current = false;
			tracking = false;
		};
	}, [frame]);

	return {
		dragging,
		suppressClick: () => {
			if (!tookRef.current) return false;
			tookRef.current = false;
			return true;
		},
	};
}
