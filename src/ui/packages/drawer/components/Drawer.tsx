import React, { useEffect, useRef, useState } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { isDismissInput } from "ui/packages/modal/components/dismissInput";
import { Portal, portalTarget } from "ui/packages/popup";
import { drawerAnchor, DrawerEdge } from "./drawerPlacement";
import useDrawerStyles from "./Drawer.styles";

export interface DrawerProps {
	host?: Instance;
	open: boolean;
	edge?: DrawerEdge;
	width?: number;
	onClose: () => void;
	children?: React.ReactNode;
}

function Drawer(props: CustomizedProps<Frame, DrawerProps>) {
	const { host, open, edge = "left", width, onClose, children, className, sx, id, ref } = props;
	const styles = useDrawerStyles({ width });
	const close = useRef(onClose);
	const anchor = useRef<Frame>();
	const [layer, setLayer] = useState(() => portalTarget(host));
	close.current = onClose;

	useEffect(() => {
		setLayer(portalTarget(host ?? anchor.current));
	}, [host, open]);

	useEffect(() => {
		if (!open) return;
		const connection = UserInputService.InputBegan.Connect((input) => {
			if (isDismissInput(input)) close.current();
		});
		return () => connection.Disconnect();
	}, [open, layer]);

	const placement = drawerAnchor(edge);
	const panelStyle = styles.panel as WriteableStyle<Frame>;
	return (
		<>
			<frame
				key="DrawerAnchor"
				ref={anchor}
				Size={UDim2.fromOffset(0, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
			/>
			{open && layer !== undefined && (
				<Portal host={layer}>
					<frame key="Drawer" {...styles.root}>
						<textbutton
							key="Backdrop"
							{...styles.backdrop}
							Event={{ Activated: () => close.current() }}
						/>
						<SxHost
							tag="frame"
							key={id || "Panel"}
							hostRef={ref}
							base={panelStyle}
							className={className}
							sx={sx}
							AnchorPoint={new Vector2(placement, 0)}
							Position={UDim2.fromScale(placement, 0)}
							ZIndex={panelStyle.ZIndex}
						>
							<uipadding {...styles.padding} />
							{children}
						</SxHost>
					</frame>
				</Portal>
			)}
		</>
	);
}

export default Drawer;
