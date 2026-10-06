import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { useDragScroll } from "ui/packages/scroll";
import useVirtualListStyles from "./VirtualList.styles";
import {
	ensureVisibleScroll,
	itemOffset,
	scrollToIndexOffset,
	visibleWindow,
	type VirtualListAlign,
} from "./virtualWindow";

export type { VirtualListAlign };

export interface VirtualListItemState {
	index: number;
}

export interface VirtualListHandle {
	scrollToIndex: (index: number, align?: VirtualListAlign) => void;
	ensureVisible: (index: number, align?: VirtualListAlign) => void;
	suppressClick: () => boolean;
}

export interface VirtualListProps<T> {
	items: ReadonlyArray<T>;
	getKey: (item: T, index: number) => string;
	renderItem: (item: T, index: number, state: VirtualListItemState) => React.Element;
	itemHeight: number;
	overscan?: number;
	listRef?: React.MutableRefObject<VirtualListHandle | undefined>;
	empty?: React.Element;
}

function VirtualList<T>(props: CustomizedProps<ScrollingFrame, VirtualListProps<T>>) {
	const { items, getKey, renderItem, itemHeight, overscan = 2, listRef, empty, className,
		sx, id, ref, children } =
		props;
	const styles = useVirtualListStyles();
	const [frame, setFrame] = useState<ScrollingFrame>();
	const [scrollTop, setScrollTop] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(0);
	const frameRef = useRef<ScrollingFrame>();
	const scrollTopRef = useRef(0);
	const viewportRef = useRef(0);
	const drag = useDragScroll(frame);
	const count = items.size();
	const canvasHeight = math.max(0, count * itemHeight);

	const applyScroll = (offset: number) => {
		const clamped = math.clamp(offset, 0, math.max(0, canvasHeight - viewportRef.current));
		scrollTopRef.current = clamped;
		setScrollTop(clamped);
		const current = frameRef.current;
		if (current) current.CanvasPosition = new Vector2(current.CanvasPosition.X, clamped);
	};

	useEffect(() => {
		if (!listRef) return;
		listRef.current = {
			scrollToIndex: (index, align = "start") => {
				applyScroll(scrollToIndexOffset(index, count, itemHeight, viewportRef.current, align));
			},
			ensureVisible: (index, align = "nearest") => {
				applyScroll(
					ensureVisibleScroll(scrollTopRef.current, viewportRef.current, index, count, itemHeight, align),
				);
			},
			suppressClick: drag.suppressClick,
		};
	});

	useEffect(() => {
		return () => {
			if (listRef) listRef.current = undefined;
		};
	}, [listRef]);

	useEffect(() => {
		if (!frame) return;
		frameRef.current = frame;

		const sync = () => {
			const nextTop = frame.CanvasPosition.Y;
			const nextHeight = frame.AbsoluteSize.Y;
			scrollTopRef.current = nextTop;
			viewportRef.current = nextHeight;
			setScrollTop(nextTop);
			setViewportHeight(nextHeight);
		};

		sync();
		const connections = [
			frame.GetPropertyChangedSignal("CanvasPosition").Connect(sync),
			frame.GetPropertyChangedSignal("AbsoluteSize").Connect(sync),
		];
		return () => {
			for (const connection of connections) connection.Disconnect();
			if (frameRef.current === frame) frameRef.current = undefined;
		};
	}, [frame]);

	useEffect(() => {
		if (!frame) return;
		const max = math.max(0, canvasHeight - frame.AbsoluteSize.Y);
		if (frame.CanvasPosition.Y > max) applyScroll(max);
	}, [frame, canvasHeight]);

	const window =
		itemHeight > 0
			? visibleWindow(scrollTop, viewportHeight, count, itemHeight, overscan)
			: { start: 0, end: -1 };

	const rows: React.Element[] = [];
	if (count > 0 && window.end >= window.start) {
		for (let index = window.start; index <= window.end; index++) {
			const item = items[index];
			rows.push(
				<frame
					key={getKey(item, index)}
					{...styles.item}
					Size={new UDim2(1, 0, 0, itemHeight)}
					Position={UDim2.fromOffset(0, itemOffset(index, itemHeight))}
				>
					{renderItem(item, index, { index })}
				</frame>,
			);
		}
	}

	return (
		<SxHost
			tag="scrollingframe"
			key={id || "VirtualList"}
			hostRef={(rbx: ScrollingFrame | undefined) => {
				setFrame(rbx);
				if (typeIs(ref, "function")) ref(rbx as ScrollingFrame);
				else if (ref) (ref as React.MutableRefObject<ScrollingFrame | undefined>).current = rbx;
			}}
			base={styles.root}
			className={className}
			sx={sx}
			CanvasSize={UDim2.fromOffset(0, canvasHeight)}
		>
			{count === 0 ? empty : rows}
			{children}
		</SxHost>
	);
}

export default VirtualList;
