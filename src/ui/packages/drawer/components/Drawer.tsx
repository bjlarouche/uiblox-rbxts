import React, { useEffect, useRef, useState } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { CustomizedProps, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { isDismissInput } from "ui/packages/modal/components/dismissInput";
import { Portal, portalTarget } from "ui/packages/popup";
import { drawerFit, DrawerEdge } from "./drawerPlacement";
import useDrawerStyles from "./Drawer.styles";

export interface DrawerProps {
	host?: Instance;
	open: boolean;
	edge?: DrawerEdge;
	width?: number;
	height?: number;
	title?: string;
	onClose: () => void;
	children?: React.ReactNode;
}

function Drawer(props: CustomizedProps<Frame, DrawerProps>) {
	const { host, open, edge = "left", width, height, title, onClose, children, className, sx, id, ref } = props;
	const styles = useDrawerStyles({ width });
	const { theme } = useTheme();
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

	const span = edge === "bottom" ? (height ?? theme.spacing.calc(20)) : (width ?? theme.spacing.calc(20));
	const room = layer !== undefined ? (edge === "bottom" ? layer.AbsoluteSize.Y : layer.AbsoluteSize.X) : 0;
	const box = drawerFit(edge, span, room);
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
							AnchorPoint={new Vector2(box.anchorX, box.anchorY)}
							Position={UDim2.fromScale(box.posX, box.posY)}
							Size={new UDim2(box.sizeX, box.sizeXO, box.sizeY, box.sizeYO)}
							ZIndex={panelStyle.ZIndex}
						>
							<frame
								key="Pad"
								Size={new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4))}
								Position={new UDim2(0, theme.padding.calc(2), 0, theme.padding.calc(2))}
								BackgroundTransparency={1}
								BorderSizePixel={0}
							>
								<uilistlayout
									FillDirection={Enum.FillDirection.Vertical}
									Padding={new UDim(0, theme.padding.calc(1))}
									SortOrder={Enum.SortOrder.LayoutOrder}
								/>
								{title !== undefined && title.size() > 0 && (
									<textlabel key="Title" {...styles.title} Text={title} />
								)}
								{children}
							</frame>
						</SxHost>
					</frame>
				</Portal>
			)}
		</>
	);
}

export default Drawer;
