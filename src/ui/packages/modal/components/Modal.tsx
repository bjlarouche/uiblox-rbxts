import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { Portal, portalTarget } from "ui/packages/popup";
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
	const anchor = useRef<Frame>();
	const [layer, setLayer] = useState(() => portalTarget(host));
	close.current = onClose;

	useEffect(() => {
		setLayer(portalTarget(host ?? anchor.current));
	}, [host, open]);

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
	}, [open, layer]);

	return (
		<>
			<frame
				key="ModalAnchor"
				ref={anchor}
				Size={UDim2.fromOffset(0, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
			/>
			{open && layer !== undefined && (
				<Portal host={layer}>
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
			)}
		</>
	);
}

export default Modal;
