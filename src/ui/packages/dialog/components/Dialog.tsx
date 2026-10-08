import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { Modal } from "ui/packages/modal";
import { portalTarget } from "ui/packages/popup";
import { dialogWidth } from "./dialogWidth";
import useDialogStyles from "./Dialog.styles";

export interface DialogProps {
	host?: Instance;
	open: boolean;
	title?: string;
	onClose: () => void;
	fullWidth?: boolean;
	children?: React.ReactNode;
	actions?: React.ReactNode;
}

function Dialog(props: CustomizedProps<Frame, DialogProps>) {
	const { host, open, title, onClose, fullWidth, children, actions, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useDialogStyles();
	const probe = useRef<Frame>();
	const [room, setRoom] = useState(0);
	const hasTitle = title !== undefined && title !== "";
	const hasActions = actions !== undefined;
	const fill = fullWidth === true;

	useEffect(() => {
		if (!fill) return;
		const layer = portalTarget(host ?? probe.current);
		if (layer === undefined || !layer.IsA("GuiBase2d")) return;
		const read = () => setRoom(layer.AbsoluteSize.X);
		read();
		const connection = layer.GetPropertyChangedSignal("AbsoluteSize").Connect(read);
		return () => connection.Disconnect();
	}, [fill, host, open]);

	const width = dialogWidth(fullWidth, room - theme.padding.calc(2) * 2, theme.padding.calc(36));
	const column = fill
		? { ...styles.column, AutomaticSize: Enum.AutomaticSize.Y, Size: UDim2.fromOffset(width, 0) }
		: styles.column;

	return (
		<>
			<frame key="Probe" ref={probe} Size={UDim2.fromOffset(0, 0)} BackgroundTransparency={1} BorderSizePixel={0} />
			<Modal host={host} open={open} onClose={onClose}>
				<SxHost
					tag="frame"
					key={id || "Column"}
					hostRef={ref}
					base={column}
					className={className}
					sx={sx}
				>
					<uilistlayout {...styles.columnList} />
					{hasTitle && <textlabel key="Title" {...styles.title} Text={title} />}
					<frame key="Body" {...styles.body}>
						{children}
					</frame>
					{hasActions && (
						<frame key="Actions" {...styles.actions}>
							<uilistlayout {...styles.actionList} />
							{actions}
						</frame>
					)}
				</SxHost>
			</Modal>
		</>
	);
}

export default Dialog;
