import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Toast } from "ui/packages/toast";
import ToastVariants from "ui/packages/toast/enums/ToastVariants";
import { snackbarActionLabel } from "./snackbarAction";

export interface SnackbarProps {
	message: string;
	onDismiss: () => void;
	duration?: number;
	variant?: ToastVariants;
	open?: boolean;
	action?: string;
	onAction?: () => void;
	edge?: "top" | "bottom";
}

function Snackbar(props: CustomizedProps<Frame, SnackbarProps>) {
	const { message, onDismiss, duration, variant, open = true, action, onAction, edge, className, sx, id, ref } = props;
	if (!open) return undefined;
	return (
		<Toast
			text={message}
			onDismiss={onDismiss}
			duration={duration}
			variant={variant}
			action={snackbarActionLabel(action)}
			onAction={onAction}
			edge={edge}
			className={className}
			sx={sx}
			id={id || "Snackbar"}
			ref={ref}
		/>
	);
}

export default Snackbar;
