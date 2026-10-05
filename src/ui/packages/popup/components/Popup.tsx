import React, { useEffect, useRef, useState } from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { popupPlacement } from "./placement";

export interface PopupProps {
	anchor?: GuiObject;
	/** Desired content height. Used to flip above the anchor and to cap the shell. */
	preferredHeight?: number;
	onDismiss?: () => void;
	onInput?: (input: InputObject) => void;
	children?: React.ReactNode;
}

function Popup(props: PopupProps) {
	const { anchor, preferredHeight, onDismiss, onInput, children } = props;
	const dismiss = useRef(onDismiss);
	dismiss.current = onDismiss;
	const [, bump] = useState(0);
	const layer = anchor?.FindFirstAncestorWhichIsA("LayerCollector");

	useEffect(() => {
		if (!anchor) return;
		const last = { stamp: "" };
		const update = () => {
			const current = anchor.FindFirstAncestorWhichIsA("LayerCollector");
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
	);
	const capped =
		preferredHeight !== undefined && preferredHeight > 0 ? math.min(preferredHeight, place.maxHeight) : undefined;

	return createPortal(
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
				Size={capped !== undefined ? UDim2.fromOffset(place.width, capped) : UDim2.fromOffset(place.width, 0)}
				AutomaticSize={capped !== undefined ? Enum.AutomaticSize.None : Enum.AutomaticSize.Y}
				ClipsDescendants={capped !== undefined}
				BackgroundTransparency={1}
				Active={false}
				ZIndex={20001}
			>
				{children}
			</frame>
		</frame>,
		layer,
	);
}

export default Popup;
