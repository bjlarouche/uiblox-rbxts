import React, { useEffect, useState } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { controlMetrics, CustomizedProps, useTheme, WriteableStyle } from "theme";
import { Icons } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { CircularProgress } from "ui/packages/circularProgress";
import { LoadingStroke } from "ui/packages/loadingStroke";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import { canActivate } from "./activation";
import { buttonFace, buttonIcon, LoadingPosition, spinnerPixels, spinnerPlace } from "./buttonLook";
import useButtonStyles from "./Button.styles";

export type DefaultButtonComponent = TextButton;

export interface ButtonProps {
	text?: string;
	size?: ButtonSize;
	color?: ButtonColor;
	fullWidth?: boolean;
	variant?: ButtonVariant;
	icon?: Icons;
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
		icon,
		disabled = false,
		loading = false,
		loadingLabel,
		loadingPosition = "center",
		reducedMotion: reducedProp,
		rounded = true,
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
		ref,
	} = props;

	const { root, font, corner, stroke } = useButtonStyles(props);
	const { theme } = useTheme();
	const metrics = controlMetrics(theme.density, props.size);
	const glyph = buttonIcon(icon, loading);
	const grow = glyph !== undefined && props.fullWidth !== true;
	const reducedMotion = useReducedMotion(reducedProp);
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled, loading);
	const pressed = disabled || (!hoveringDisabled && active && (hovering || focused));
	const face = buttonFace(text, loading, loadingLabel);
	const place = spinnerPlace(loadingPosition);
	const busy = loading || animating;
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
		<SxHost
			tag="textbutton"
			key={id || "Button"}
			hostRef={ref}
			base={{ ...root, ...font }}
			className={className}
			sx={sx}
			state={{ disabled, loading, hover: hovering, pressed, focused }}
			Active={active}
			AutoButtonColor={active}
			Selectable={active}
			Text={glyph !== undefined ? "" : face.text}
			{...(glyph !== undefined ? {} : face.hideText ? { TextTransparency: 1 } : {})}
			{...(grow
				? { AutomaticSize: Enum.AutomaticSize.X, Size: new UDim2(0, 0, 0, metrics.buttonHeight) }
				: {})}
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
			{variant === "outlined" && !busy && <uistroke {...stroke} />}
			{busy && <LoadingStroke animating={busy && !reducedMotion} color={spinnerColor} />}
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
			{glyph !== undefined && (
				<>
					<uipadding
						PaddingLeft={new UDim(0, theme.padding.calc(2))}
						PaddingRight={new UDim(0, theme.padding.calc(2))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						SortOrder={Enum.SortOrder.LayoutOrder}
						Padding={new UDim(0, theme.padding.calc(1))}
					/>
					<imagelabel
						key="Icon"
						LayoutOrder={1}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						ScaleType={Enum.ScaleType.Fit}
						Image={glyph}
						ImageColor3={spinnerColor}
						Size={UDim2.fromOffset(metrics.icon, metrics.icon)}
					/>
					<textlabel
						key="Label"
						LayoutOrder={2}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						AutomaticSize={Enum.AutomaticSize.XY}
						Size={UDim2.fromScale(0, 0)}
						Font={theme.typography.fontFamilies.default}
						TextSize={metrics.font}
						TextColor3={spinnerColor}
						Text={face.text}
					/>
				</>
			)}
			{children}
		</SxHost>
	);
}

export default Button;
