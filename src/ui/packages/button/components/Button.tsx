import Roact, { FunctionComponent } from "@rbxts/roact";
import { markPureComponent, useState } from "@rbxts/roact-hooked";
import { CustomizedProps, WriteableStyle } from "theme";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import useButtonStyles from "./Button.styles";

export type DefaultButtonComponent = TextButton;

export interface ButtonProps {
	text?: string;
	size?: ButtonSize;
	color?: ButtonColor;
	fullWidth?: boolean;
	variant?: ButtonVariant;
	// startIcon: Icons;
	// showStartIcon?: boolean;
	// endIcon: Icons;
	// showEndIcon?: boolean;
	disabled?: boolean;
	loading?: boolean;
	rounded?: boolean;
	hoveringDisabled?: boolean;
	onLeftClick?: () => void;
	onLeftDown?: () => void;
	onLeftUp?: () => void;
	onRightClick?: () => void;
	onRightDown?: () => void;
	onRightUp?: () => void;
	mouseEnter?: () => void;
	mouseLeave?: () => void;
}

const Button: FunctionComponent<CustomizedProps<DefaultButtonComponent, ButtonProps>> = (props) => {
	const {
		text = "",
		variant = "contained",
		disabled = false,
		loading = false,
		rounded = false,
		hoveringDisabled = false,
		onLeftClick,
		onLeftDown,
		onLeftUp,
		onRightClick,
		onRightDown,
		onRightUp,
		mouseEnter,
		mouseLeave,
		className,
		[Roact.Children]: children,
	} = props;

	const { root, font, corner, stroke } = useButtonStyles(props);
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<textbutton
			Key={"Button"}
			{...root}
			{...font}
			Active={!disabled && !loading}
			Text={text}
			BackgroundTransparency={
				(!hoveringDisabled && hovering) || disabled || loading
					? 0.75
					: (className as WriteableStyle<DefaultButtonComponent>)?.BackgroundTransparency ??
					  (variant === "outlined" || variant === "text" ? 1 : 0)
			}
			Event={{
				MouseEnter: () => {
					setHovering(true);

					if (mouseEnter) {
						mouseEnter();
					}
				},
				MouseLeave: () => {
					setHovering(false);

					if (mouseLeave) {
						mouseLeave();
					}
				},
				MouseButton1Click: () => {
					if (!disabled && !loading) {
						if (onLeftClick) {
							onLeftClick();
						}
					}
				},
				MouseButton1Down: () => {
					if (!disabled && !loading) {
						if (onLeftDown) {
							onLeftDown();
						}
					}
				},
				MouseButton1Up: () => {
					if (!disabled && !loading) {
						if (onLeftUp) {
							onLeftUp();
						}
					}
				},
				MouseButton2Click: () => {
					if (!disabled && !loading) {
						if (onRightClick) {
							onRightClick();
						}
					}
				},
				MouseButton2Down: () => {
					if (!disabled && !loading) {
						if (onRightDown) {
							onRightDown();
						}
					}
				},
				MouseButton2Up: () => {
					if (!disabled && !loading) {
						if (onRightUp) {
							onRightUp();
						}
					}
				},
			}}
			{...className}
		>
			{variant === "outlined" && <uistroke {...stroke} />}
			{rounded && <uicorner {...corner} />}
			{children}
		</textbutton>
	);
};

export default markPureComponent(Button);
