import React, { useEffect, useRef, useState } from "@rbxts/react";
import { popupPlacement } from "./placement";
import Portal from "./Portal";
import { portalTarget } from "./portalTarget";

export interface PopupProps {
	anchor?: GuiObject;
	/** Content height. Flips above the anchor and caps the shell. */
	preferredHeight?: number;
	/** Content width. Falls back to the anchor width. Clamped to the layer. */
	preferredWidth?: number;
	onDismiss?: () => void;
	onInput?: (input: InputObject) => void;
	children?: React.ReactNode;
}

function Popup(props: PopupProps) {
	const { anchor, preferredHeight, preferredWidth, onDismiss, onInput, children } = props;
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

	if (!anchor || !layer) return undefined;
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
				<frame
					key="Content"
					Position={UDim2.fromOffset(place.x, place.y)}
					AnchorPoint={new Vector2(0, place.above ? 1 : 0)}
					Size={capped ? UDim2.fromOffset(place.width, place.height) : UDim2.fromOffset(place.width, 0)}
					AutomaticSize={capped ? Enum.AutomaticSize.None : Enum.AutomaticSize.Y}
					ClipsDescendants={capped}
					BackgroundTransparency={1}
					Active={false}
					ZIndex={20001}
				>
					{children}
				</frame>
			</frame>
		</Portal>
	);
}

export default Popup;
