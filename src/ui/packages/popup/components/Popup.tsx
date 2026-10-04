import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";

export interface PopupProps {
	anchor?: GuiObject;
	onDismiss?: () => void;
	children?: React.ReactNode;
}

function Popup(props: PopupProps) {
	const { anchor, onDismiss, children } = props;
	const layer = anchor?.FindFirstAncestorWhichIsA("LayerCollector");
	if (!anchor || !layer) return undefined;

	const offset = anchor.AbsolutePosition.sub(layer.AbsolutePosition);
	const above = offset.Y + anchor.AbsoluteSize.Y / 2 > layer.AbsoluteSize.Y / 2;

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
					Event={{ Activated: onDismiss }}
				/>
			)}
			<frame
				key="Content"
				Position={UDim2.fromOffset(offset.X, above ? offset.Y : offset.Y + anchor.AbsoluteSize.Y)}
				AnchorPoint={new Vector2(0, above ? 1 : 0)}
				Size={UDim2.fromOffset(anchor.AbsoluteSize.X, 0)}
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundTransparency={1}
				ZIndex={20001}
			>
				{children}
			</frame>
		</frame>,
		layer,
	);
}

export default Popup;
