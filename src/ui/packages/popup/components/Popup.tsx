import React, { useEffect, useRef, useState } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { motionDuration } from "ui/packages/motion/duration";
import { playProperty } from "ui/packages/motion/play";
import { popupPlacement } from "./placement";
import Portal from "./Portal";
import { portalTarget } from "./portalTarget";

export interface PopupProps {
	anchor?: GuiObject;
	/** Content height. Flips above the anchor and caps the shell. */
	preferredHeight?: number;
	/** Content width. Falls back to the anchor width. Clamped to the layer. */
	preferredWidth?: number;
	/** Stays mounted through the close tween. Omit to show while the parent renders it. */
	open?: boolean;
	onDismiss?: () => void;
	onInput?: (input: InputObject) => void;
	children?: React.ReactNode;
}

function MotionScale(props: { open: boolean }) {
	const ref = useRef<UIScale>();
	const reduced = useReducedMotion();
	const { theme } = useTheme();
	const open = props.open;

	useEffect(() => {
		const scale = ref.current;
		if (!scale) return;
		if (open && !reduced) scale.Scale = 0.96;
		const seconds = open ? theme.motion.default : theme.motion.fast;
		const stop = playProperty(scale, { Scale: open ? 1 : 0.96 }, seconds, reduced);
		return stop;
	}, [open, reduced, theme]);

	return <uiscale key="Motion" ref={ref} />;
}

function Popup(props: CustomizedProps<Frame, PopupProps>) {
	const { anchor, preferredHeight, preferredWidth, open, onDismiss, onInput, children, className, sx, id, ref } = props;
	const visible = open !== false;
	const [held, setHeld] = useState(visible);
	const reduced = useReducedMotion();
	const { theme } = useTheme();

	useEffect(() => {
		if (visible) setHeld(true);
	}, [visible]);

	useEffect(() => {
		if (!held || visible) return;
		const delay = motionDuration(theme.motion.fast, reduced);
		if (delay === 0) {
			setHeld(false);
			return;
		}
		let alive = true;
		const thread = task.delay(delay, () => {
			if (alive) setHeld(false);
		});
		return () => {
			alive = false;
			task.cancel(thread);
		};
	}, [visible, held, reduced, theme]);
	const dismiss = useRef(onDismiss);
	dismiss.current = onDismiss;
	const [, bump] = useState(0);
	const layer = anchor ? portalTarget(anchor) : undefined;

	useEffect(() => {
		if (!anchor) return;
		const last = { stamp: "" };
		const update = () => {
			const current = portalTarget(anchor);
			if (!anchor.Parent || !current) {
				if (dismiss.current) dismiss.current();
				else bump((n) => n + 1);
				return;
			}
			const stamp = `${anchor.AbsolutePosition.X},${anchor.AbsolutePosition.Y},${anchor.AbsoluteSize.X},${anchor.AbsoluteSize.Y},${current.AbsolutePosition.X},${current.AbsolutePosition.Y},${current.AbsoluteSize.X},${current.AbsoluteSize.Y}`;
			if (stamp === last.stamp) return;
			last.stamp = stamp;
			bump((n) => n + 1);
		};
		const connections = [
			anchor.GetPropertyChangedSignal("AbsolutePosition").Connect(update),
			anchor.GetPropertyChangedSignal("AbsoluteSize").Connect(update),
			anchor.AncestryChanged.Connect(update),
		];
		if (layer) {
			connections.push(layer.GetPropertyChangedSignal("AbsolutePosition").Connect(update));
			connections.push(layer.GetPropertyChangedSignal("AbsoluteSize").Connect(update));
		}
		return () => connections.forEach((connection) => connection.Disconnect());
	}, [anchor, layer]);

	if (!held || !anchor || !layer) return undefined;
	const place = popupPlacement(
		anchor.AbsolutePosition.X,
		anchor.AbsolutePosition.Y,
		anchor.AbsoluteSize.X,
		anchor.AbsoluteSize.Y,
		layer.AbsolutePosition.X,
		layer.AbsolutePosition.Y,
		layer.AbsoluteSize.Y,
		layer.AbsoluteSize.X,
		preferredHeight ?? 0,
		preferredWidth ?? 0,
	);
	const capped = place.height > 0;

	return (
		<Portal host={layer}>
			<frame key="Popup" Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} ZIndex={20000}>
				{onDismiss && (
					<textbutton
						key="Backdrop"
						Size={UDim2.fromScale(1, 1)}
						BackgroundTransparency={1}
						Text=""
						AutoButtonColor={false}
						Selectable={false}
						ZIndex={20000}
						Event={{
							Activated: onDismiss,
							InputBegan: (_, input) => onInput?.(input),
						}}
					/>
				)}
				<SxHost
					tag="frame"
					key={id || "Content"}
					hostRef={ref}
					base={{ BackgroundTransparency: 1 }}
					className={className}
					sx={sx}
					Position={UDim2.fromOffset(place.x, place.y)}
					AnchorPoint={new Vector2(0, place.above ? 1 : 0)}
					Size={capped ? UDim2.fromOffset(place.width, place.height) : UDim2.fromOffset(place.width, 0)}
					AutomaticSize={capped ? Enum.AutomaticSize.None : Enum.AutomaticSize.Y}
					ClipsDescendants={capped}
					Active={false}
					ZIndex={20001}
				>
					<MotionScale open={visible} />
					{children}
				</SxHost>
			</frame>
		</Portal>
	);
}

export default Popup;
