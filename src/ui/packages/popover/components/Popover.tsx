import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { Popup } from "ui/packages/popup";
import usePopoverStyles from "./Popover.styles";

export interface PopoverProps {
	anchor?: GuiObject;
	open?: boolean;
	preferredHeight?: number;
	preferredWidth?: number;
	onDismiss?: () => void;
	children?: React.ReactNode;
}

function Popover(props: CustomizedProps<Frame, PopoverProps>) {
	const { anchor, open, preferredHeight, preferredWidth, onDismiss, children, className, sx, id, ref } = props;
	const styles = usePopoverStyles();
	const closed = open !== true;
	return (
		<Popup open={!closed} anchor={anchor} preferredHeight={preferredHeight} preferredWidth={preferredWidth} onDismiss={onDismiss}>
			<SxHost tag="frame" key={id || "Popover"} hostRef={ref} base={styles.root} className={className} sx={sx}>
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
				<uipadding {...styles.padding} />
				{children}
			</SxHost>
		</Popup>
	);
}

export default Popover;
