import React, { useState } from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import { canActivate } from "./activation";
import useButtonStyles from "./Button.styles";
import { LoadingStroke } from "ui/packages/loadingStroke";

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
	animating?: boolean;
	onLeftClick?: () => void;
	onLeftDown?: () => void;
	onLeftUp?: () => void;
	onRightClick?: () => void;
	onRightDown?: () => void;
	onRightUp?: () => void;
	mouseEnter?: () => void;
	mouseLeave?: () => void;
}

function Button(props: CustomizedProps<DefaultButtonComponent, ButtonProps>) {
	const {
		text = "",
		variant = "contained",
		disabled = false,
		loading = false,
		rounded = false,
		hoveringDisabled = false,
		animating = false,
		onLeftClick,
		onLeftDown,
		onLeftUp,
		onRightClick,
		onRightDown,
		onRightUp,
		mouseEnter,
		mouseLeave,
		className,
		children,
		id,
		ref
	} = props;

	const { root, font, corner, stroke } = useButtonStyles(props);
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled, loading);
	const pressed = disabled || (!hoveringDisabled && active && (hovering || focused));

	return (
		<textbutton
			key={id || "Button"}
			ref={ref}
			{...root}
			{...font}
			{...className}
			Active={active}
			Selectable={!disabled}
			Text={text}
			BackgroundTransparency={
				pressed
					? 0.75
					: (className as WriteableStyle<DefaultButtonComponent>)?.BackgroundTransparency ??
					  (variant === "outlined" || variant === "text" ? 1 : 0)
			}
			Event={{
				MouseEnter: () => {
					if (!active) return;
					setHovering(true);
					if (mouseEnter) mouseEnter();
				},
				MouseLeave: () => {
					setHovering(false);
					if (mouseLeave) mouseLeave();
				},
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
				MouseButton1Click: () => {
					if (active && onLeftClick) onLeftClick();
				},
				MouseButton1Down: () => {
					if (active && onLeftDown) onLeftDown();
				},
				MouseButton1Up: () => {
					if (active && onLeftUp) onLeftUp();
				},
				MouseButton2Click: () => {
					if (active && onRightClick) onRightClick();
				},
				MouseButton2Down: () => {
					if (active && onRightDown) onRightDown();
				},
				MouseButton2Up: () => {
					if (active && onRightUp) onRightUp();
				},
			}}
		>
			{variant === "outlined" && !animating && <uistroke {...stroke} />}
			{animating && <LoadingStroke animating={animating} />}
			{rounded && <uicorner {...corner} />}
			
			{children}
		</textbutton>
	);
}

export default Button;
