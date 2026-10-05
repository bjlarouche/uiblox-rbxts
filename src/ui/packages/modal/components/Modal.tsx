import React, { useEffect, useRef } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { Portal } from "ui/packages/popup";
import { isDismissInput } from "./dismissInput";
import useModalStyles from "./Modal.styles";

export interface ModalProps {
	host?: Instance;
	open: boolean;
	onClose: () => void;
	children?: React.ReactNode;
}

function Modal(props: ModalProps) {
	const { host, open, onClose, children } = props;
	const styles = useModalStyles();
	const close = useRef(onClose);
	close.current = onClose;

	useEffect(() => {
		if (!open) return;
		const previous = GuiService.SelectedObject;
		const connection = UserInputService.InputBegan.Connect((input) => {
			if (isDismissInput(input)) close.current();
		});
		return () => {
			connection.Disconnect();
			if (previous && previous.Parent) GuiService.SelectedObject = previous;
		};
	}, [open]);

	if (!open) return undefined;

	return (
		<Portal host={host}>
			<frame key="Modal" {...styles.root}>
				<textbutton
					key="Backdrop"
					{...styles.backdrop}
					Event={{
						Activated: () => close.current(),
					}}
				/>
				<frame key="Surface" {...styles.surface}>
					<uipadding {...styles.padding} />
					<uicorner {...styles.corner} />
					{children}
				</frame>
			</frame>
		</Portal>
	);
}

export default Modal;
