import React, { useEffect, useState } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { controlMetrics, CustomizedProps, Theme, useTheme } from "theme";
import { Icons } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { CircularProgress } from "ui/packages/circularProgress";
import { LoadingStroke } from "ui/packages/loadingStroke";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import { canActivate } from "./activation";
import { buttonFace, buttonIcon, LoadingPosition, spinnerPixels, spinnerPlace } from "./buttonLook";
import { ButtonPaint, buttonPaint } from "./buttonPaint";
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

	const { root, font, corner, stroke, focus } = useButtonStyles(props);
	const { theme } = useTheme();
	const metrics = controlMetrics(theme.density, props.size);
	const glyph = buttonIcon(icon, loading);
	const grow = glyph !== undefined && props.fullWidth !== true;
	const reducedMotion = useReducedMotion(reducedProp);
	const [hovering, setHovering] = useState(false);
	const [down, setDown] = useState(false);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled, loading);
	const face = buttonFace(text, loading, loadingLabel);
	const place = spinnerPlace(loadingPosition);
	const busy = loading || animating;
	const sweep = animating && !loading;
	const branded = (props.color ?? "primary") === "primary";
	const paint = buttonPaint({
		variant,
		branded,
		disabled,
		hover: hovering && !hoveringDisabled && active,
		down: down && active,
	});
	const colors = buttonColors(theme, paint);
	const labelTransparency = face.hideText ? 1 : paint.labelTransparency;

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
		setDown(false);
	}, [active]);

	return (
		<SxHost
			tag="textbutton"
			key={id || "Button"}
			hostRef={ref}
			base={{
				...root,
				...font,
				BackgroundColor3: colors.fill,
				BackgroundTransparency: paint.fillTransparency,
				TextColor3: colors.label,
				TextTransparency: labelTransparency,
			}}
			className={className}
			sx={sx}
			state={{ disabled, loading, hover: hovering && !hoveringDisabled, pressed: down, focused }}
			Active={active}
			AutoButtonColor={false}
			Selectable={active}
			Text={glyph !== undefined ? "" : face.text}
			{...(grow
				? { AutomaticSize: Enum.AutomaticSize.X, Size: new UDim2(0, 0, 0, metrics.buttonHeight) }
				: {})}
			Event={{
				MouseEnter: () => {
					if (!active) return;
					setHovering(true);
					if (mouseEnter) mouseEnter();
				},
				MouseLeave: () => {
					setHovering(false);
					setDown(false);
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
					if (!active) return;
					setDown(true);
					if (onLeftDown) onLeftDown();
				},
				MouseButton1Up: () => {
					setDown(false);
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
			{!sweep && focused && <uistroke {...focus} />}
			{!sweep && !focused && variant === "outlined" && <uistroke {...stroke} />}
			{sweep && <LoadingStroke animating={!reducedMotion} color={colors.label} />}
			{rounded && <uicorner {...corner} />}
			{loading && (
				<CircularProgress
					size={spinnerPixels(props.size)}
					thickness={2}
					color={colors.label}
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
						ImageColor3={colors.label}
						ImageTransparency={labelTransparency}
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
						TextColor3={colors.label}
						TextTransparency={labelTransparency}
						Text={face.text}
					/>
				</>
			)}
			{children}
		</SxHost>
	);
}

function buttonColors(theme: Theme, paint: ButtonPaint) {
	const brand = theme.palette.primary;
	const fills: Record<ButtonPaint["fill"], Color3> = {
		primary: brand.main,
		primaryHover: brand.hover,
		primaryPressed: brand.pressed,
		ink: theme.palette.text.primary,
		actionHover: theme.palette.action.hover,
		actionPressed: theme.palette.action.pressed,
		none: theme.palette.surface.paper,
	};
	const labels: Record<ButtonPaint["label"], Color3> = {
		onPrimary: brand.on,
		inverse: theme.palette.text.inverse,
		primary: brand.main,
		ink: theme.palette.text.primary,
		disabled: theme.palette.text.disabled,
	};
	return { fill: fills[paint.fill], label: labels[paint.label] };
}

export default Button;
