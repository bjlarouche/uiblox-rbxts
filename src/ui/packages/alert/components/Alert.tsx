import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { AlertSeverity } from "./alertTone";
import useAlertStyles from "./Alert.styles";

export interface AlertProps {
	severity?: AlertSeverity;
	title?: string;
	message: string;
	onClose?: () => void;
	filled?: boolean;
	square?: boolean;
}

function Alert(props: CustomizedProps<Frame, AlertProps>) {
	const { severity, title, message, onClose, filled, square, className, sx, id, ref } = props;
	const dismissible = onClose !== undefined;
	const styles = useAlertStyles({ severity, dismissible, filled });
	return (
		<frame key={id || "Alert"} ref={ref} {...styles.root} {...className} {...sx}>
			<uipadding {...styles.padding} />
			{square !== true && <uicorner {...styles.corner} />}
			<uistroke {...styles.stroke} />
			{dismissible && (
				<imagebutton
					key="Close"
					{...styles.close}
					Image={tostring(Icons.Close)}
					Event={{ Activated: () => onClose() }}
				/>
			)}
			<frame key="Body" {...styles.body}>
				<uilistlayout {...styles.layout} />
				{title !== undefined && title !== "" && <textlabel key="Title" {...styles.title} Text={title} />}
				<textlabel key="Message" {...styles.message} Text={message} />
			</frame>
		</frame>
	);
}

export default Alert;
