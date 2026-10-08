import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { alertAction } from "./alertAction";
import { AlertSeverity } from "./alertTone";
import useAlertStyles from "./Alert.styles";

export interface AlertProps {
	severity?: AlertSeverity;
	title?: string;
	message: string;
	onClose?: () => void;
	action?: string;
	onAction?: () => void;
	filled?: boolean;
	square?: boolean;
}

function Alert(props: CustomizedProps<Frame, AlertProps>) {
	const { severity, title, message, onClose, action, onAction, filled, square, className, sx, id, ref } = props;
	const dismissible = onClose !== undefined;
	const label = alertAction(action);
	const styles = useAlertStyles({ severity, dismissible, filled });
	return (
		<SxHost tag="frame" key={id || "Alert"} hostRef={ref} base={styles.root} className={className} sx={sx}>
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
				{label !== undefined && (
					<textbutton
						key="Action"
						{...styles.action}
						Text={label}
						Event={{
							Activated: () => {
								if (onAction) onAction();
							},
						}}
					/>
				)}
			</frame>
		</SxHost>
	);
}

export default Alert;
