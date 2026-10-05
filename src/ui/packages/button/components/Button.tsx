import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, useTheme, WriteableStyle } from "theme";
import { CircularProgress } from "ui/packages/circularProgress";
import { LoadingStroke } from "ui/packages/loadingStroke";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import { canActivate } from "./activation";
import { buttonFace, LoadingPosition, spinnerPixels, spinnerPlace } from "./buttonLook";
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
	loadingLabel?: string;
	loadingPosition?: LoadingPosition;
	reducedMotion?: boolean;
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
		loadingLabel,
		loadingPosition = "center",
		reducedMotion,
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
		sx,
		children,
		id,
		ref
	} = props;

	const { root, font, corner, stroke } = useButtonStyles(props);
	const { theme } = useTheme();
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled, loading);
	const pressed = disabled || (!hoveringDisabled && active && (hovering || focused));
	const face = buttonFace(text, loading, loadingLabel);
	const place = spinnerPlace(loadingPosition);
	const branded = (props.color ?? "primary") === "primary";
	const spinnerColor =
		variant === "contained"
			? branded
				? theme.palette.primary.on
				: theme.palette.text.inverse
			: branded
				? theme.palette.primary.main
				: theme.palette.text.primary;

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
	}, [active]);

	return (
		<textbutton
			key={id || "Button"}
			ref={ref}
			{...root}
			{...font}
			{...className} {...sx}
			Active={active}
			AutoButtonColor={active}
			Selectable={active}
			Text={face.text}
			{...(face.hideText ? { TextTransparency: 1 } : {})}
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
				SelectionGained: () => {
					if (active) setFocused(true);
				},
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
			{loading && (
				<CircularProgress
					size={spinnerPixels(props.size)}
					thickness={2}
					color={spinnerColor}
					reducedMotion={reducedMotion}
					className={{
						AnchorPoint: new Vector2(place.anchorX, 0.5),
						Position: new UDim2(place.xScale, place.xOffset, 0.5, 0),
						ZIndex: 10001,
					}}
				/>
			)}
			{children}
		</textbutton>
	);
}

export default Button;
