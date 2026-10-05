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
}

function Alert(props: CustomizedProps<Frame, AlertProps>) {
	const { severity, title, message, onClose, className, sx, id, ref } = props;
	const styles = useAlertStyles({ severity });
	return (
		<frame key={id || "Alert"} ref={ref} {...styles.root} {...className} {...sx}>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
			<uilistlayout {...styles.layout} />
			{title !== undefined && title !== "" && <textlabel key="Title" {...styles.title} Text={title} />}
			<textlabel key="Message" {...styles.message} Text={message} />
			{onClose !== undefined && (
				<imagebutton
					key="Close"
					{...styles.close}
					Image={tostring(Icons.Close)}
					Event={{ Activated: () => onClose() }}
				/>
			)}
		</frame>
	);
}

export default Alert;
