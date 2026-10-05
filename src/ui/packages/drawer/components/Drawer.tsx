import React, { useEffect, useRef } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { Portal } from "ui/packages/popup";
import { isDismissInput } from "ui/packages/modal/components/dismissInput";
import { drawerAnchor, DrawerEdge } from "./drawerPlacement";
import useDrawerStyles from "./Drawer.styles";

export interface DrawerProps {
	host?: Instance;
	open: boolean;
	edge?: DrawerEdge;
	onClose: () => void;
	children?: React.ReactNode;
}

function Drawer(props: DrawerProps) {
	const { host, open, edge = "left", onClose, children } = props;
	const styles = useDrawerStyles();
	const close = useRef(onClose);
	close.current = onClose;

	useEffect(() => {
		if (!open) return;
		const connection = UserInputService.InputBegan.Connect((input) => {
			if (isDismissInput(input)) close.current();
		});
		return () => connection.Disconnect();
	}, [open]);

	if (!open) return undefined;
	const anchor = drawerAnchor(edge);
	return (
		<Portal host={host}>
			<frame key="Drawer" {...styles.root}>
				<textbutton
					key="Backdrop"
					{...styles.backdrop}
					Event={{ Activated: () => close.current() }}
				/>
				<frame
					key="Panel"
					{...styles.panel}
					AnchorPoint={new Vector2(anchor, 0)}
					Position={UDim2.fromScale(anchor, 0)}
				>
					<uipadding {...styles.padding} />
					{children}
				</frame>
			</frame>
		</Portal>
	);
}

export default Drawer;
