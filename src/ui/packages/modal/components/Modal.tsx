import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
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

function Modal(props: CustomizedProps<Frame, ModalProps>) {
	const { host, open, onClose, children, className, sx, id, ref } = props;
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

	const surfaceStyle = styles.surface as WriteableStyle<Frame>;
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
						<SxHost
							tag="frame"
							key={id || "Surface"}
							hostRef={(instance: Frame | undefined) => {
								surface.current = instance;
								if (ref === undefined) return;
								if (typeIs(ref, "function")) {
									ref(instance as Frame);
									return;
								}
								(ref as { current?: Frame }).current = instance;
							}}
							base={surfaceStyle}
							className={className}
							sx={sx}
							AnchorPoint={surfaceStyle.AnchorPoint}
							Position={surfaceStyle.Position}
							ZIndex={surfaceStyle.ZIndex}
						>
							<uipadding {...styles.padding} />
							<uicorner {...styles.corner} />
							{children}
						</SxHost>
					</frame>
				</Portal>
			)}
		</>
	);
}

export default Modal;
