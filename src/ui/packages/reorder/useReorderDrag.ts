import { useEffect, useRef, useState } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { DragRect, hitRect, isReorderMove, isReorderPress, isReorderRelease, passedDragThreshold } from "./reorder";

export interface ReorderDragState {
	active: boolean;
	id?: string;
	overId?: string;
	x: number;
	y: number;
}

export interface ReorderDragHandle {
	drag: ReorderDragState;
	begin: (id: string, input: InputObject) => boolean;
	cancel: () => void;
	suppressClick: () => boolean;
}

const rest = (): ReorderDragState => ({ active: false, x: 0, y: 0 });

interface Tracking {
	down: boolean;
	active: boolean;
	id?: string;
	overId?: string;
	x: number;
	y: number;
	startX: number;
	startY: number;
}

export function useReorderDrag(onDrop: (fromId: string, overId?: string) => void, getRects: () => readonly DragRect[]): ReorderDragHandle {
	const [drag, setDrag] = useState<ReorderDragState>(rest());
	const tracking = useRef<Tracking>({ down: false, active: false, x: 0, y: 0, startX: 0, startY: 0 });
	const onDropRef = useRef(onDrop);
	const rectsRef = useRef(getRects);
	const took = useRef(false);
	onDropRef.current = onDrop;
	rectsRef.current = getRects;

	const clear = (drop: boolean) => {
		const current = tracking.current;
		tracking.current = { down: false, active: false, x: 0, y: 0, startX: 0, startY: 0 };
		setDrag(rest());
		if (drop && current.active && current.id !== undefined) {
			took.current = true;
			onDropRef.current(current.id, current.overId);
		}
	};

	useEffect(() => {
		const changed = UserInputService.InputChanged.Connect((input) => {
			const current = tracking.current;
			if (!current.down || !isReorderMove(input.UserInputType)) return;
			const x = input.Position.X;
			const y = input.Position.Y;
			const active = current.active || passedDragThreshold(current.startX, current.startY, x, y);
			const overId = active ? hitRect(rectsRef.current(), x, y) : undefined;
			tracking.current = { ...current, active, x, y, overId };
			if (active) setDrag({ active: true, id: current.id, overId, x, y });
		});
		const ended = UserInputService.InputEnded.Connect((input) => {
			if (!tracking.current.down || !isReorderRelease(input.UserInputType)) return;
			clear(true);
		});
		const began = UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.Escape) clear(false);
		});
		return () => {
			changed.Disconnect();
			ended.Disconnect();
			began.Disconnect();
		};
	}, []);

	return {
		drag,
		begin: (id, input) => {
			if (!isReorderPress(input.UserInputType)) return false;
			const x = input.Position.X;
			const y = input.Position.Y;
			tracking.current = { down: true, active: false, id, x, y, startX: x, startY: y };
			return true;
		},
		cancel: () => clear(false),
		suppressClick: () => {
			if (!took.current) return false;
			took.current = false;
			return true;
		},
	};
}
