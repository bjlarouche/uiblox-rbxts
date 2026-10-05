import React, { useEffect, useRef } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { Portal } from "ui/packages/popup";
import { isDismissInput } from "./dismissInput";
import { isFocusable, pickFocus } from "./focusTrap";
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
	const surface = useRef<Frame>();
	close.current = onClose;

	useEffect(() => {
		if (!open) return;
		const previous = GuiService.SelectedObject;
		const root = surface.current;
		const pull = () => {
			if (!root) return;
			const selected = GuiService.SelectedObject;
			const choice = pickFocus(
				root.GetDescendants(),
				selected,
				selected !== undefined && selected.IsDescendantOf(root),
				isFocusable,
			);
			if (choice !== undefined && isFocusable(choice) && choice !== selected) GuiService.SelectedObject = choice;
		};
		pull();
		const selection = GuiService.GetPropertyChangedSignal("SelectedObject").Connect(pull);
		const connection = UserInputService.InputBegan.Connect((input) => {
			if (isDismissInput(input)) close.current();
		});
		return () => {
			selection.Disconnect();
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
				<frame key="Surface" ref={surface} {...styles.surface}>
					<uipadding {...styles.padding} />
					<uicorner {...styles.corner} />
					{children}
				</frame>
			</frame>
		</Portal>
	);
}

export default Modal;
