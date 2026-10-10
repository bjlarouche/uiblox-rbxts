import React, { useEffect, useState } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { Icons } from "ui/enums";
import { CustomizedProps, focusRing, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { canActivate } from "ui/packages/button/components/activation";
import { iconSpinnerPixels } from "ui/packages/button/components/buttonLook";
import { CircularProgress } from "ui/packages/circularProgress";
import { DrawnGlyph } from "ui/packages/icon/components/DrawnGlyph";
import { Glyph } from "ui/packages/icon/components/glyphs";
import { iconButtonFace, iconButtonScale, iconGlyphExtent } from "./iconButtonBox";
import useIconButtonStyles from "./IconButton.styles";
import { isTransportGlyph, transportGlyph, TransportGlyph } from "./transportGlyph";

export interface IconButtonProps {
	icon?: Icons;
	glyph?: TransportGlyph | Glyph;
	/** Glyph pixels, usually `controlMetrics().icon`. `size` stays the hit target. */
	iconSize?: number;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint: Color3;
	selected?: boolean;
	disabled?: boolean;
	loading?: boolean;
	reducedMotion?: boolean;
	onClick?: () => void;
}

type DefaultIconButtonComponent = ImageButton;

function IconButton(props: CustomizedProps<DefaultIconButtonComponent, IconButtonProps>) {
	const {
		icon,
		glyph,
		iconSize,
		selected,
		tint,
		disabled,
		loading = false,
		reducedMotion: reducedProp,
		onClick,
		className,
		sx,
		id,
		ref,
	} = props;
	const { container, corner } = useIconButtonStyles(props);
	const { theme } = useTheme();
	const reducedMotion = useReducedMotion(reducedProp);
	const active = canActivate(disabled, loading);
	const extent = theme.spacing.calc(iconButtonScale(props.size));
	const glyphBox = iconSize ?? iconGlyphExtent(extent);
	const drawn = glyph !== undefined && isTransportGlyph(glyph) && !loading ? transportGlyph(glyph, glyphBox) : undefined;
	const sketched = glyph !== undefined && !isTransportGlyph(glyph) && !loading ? glyph : undefined;
	const [hovering, setHovering] = useState(false);
	const [down, setDown] = useState(false);
	const [focused, setFocused] = useState(false);
	const face = iconButtonFace({
		disabled: disabled === true,
		loading,
		selected: selected === true,
		hover: hovering && active,
		down: down && active,
	});
	const fill =
		face === "pressed"
			? theme.palette.action.pressed
			: face === "selected"
				? theme.palette.action.selected
				: theme.palette.action.hover;
	const mark = disabled === true && !loading ? 0.45 : 0;

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setDown(false);
		setFocused(false);
	}, [active]);

	return (
		<SxHost
			tag="imagebutton"
			key={id || "IconButton"}
			hostRef={ref}
			base={{
				...container,
				BackgroundColor3: fill,
				BackgroundTransparency: face === "clear" ? 1 : 0,
			}}
			className={className}
			sx={sx}
			state={{ disabled, loading, selected, hover: hovering, pressed: down, focused }}
			Active={active}
			AutoButtonColor={false}
			Selectable={active}
			Image={drawn !== undefined || sketched !== undefined || icon === undefined ? "" : tostring(icon)}
			ImageTransparency={drawn !== undefined || sketched !== undefined || loading ? 1 : mark}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
			Event={{
				MouseButton1Click: () => {
					if (active && onClick) onClick();
				},
				MouseButton1Down: () => {
					if (active) setDown(true);
				},
				MouseButton1Up: () => setDown(false),
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
					setDown(false);
				},
				SelectionGained: () => {
					if (active) setFocused(true);
				},
				SelectionLost: () => setFocused(false),
			}}
		>
			<uicorner {...corner} />
			{focused && active ? <uistroke {...focusRing(theme.palette.focus)} /> : undefined}
			{drawn !== undefined ? (
				<frame
					key="Glyph"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromOffset(glyphBox, glyphBox)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ZIndex={12001}
				>
					{drawn.map((part, index) => (
						<frame
							key={`g-${index}`}
							Position={UDim2.fromOffset(part.x, part.y)}
							Size={UDim2.fromOffset(math.max(part.w, 1), math.max(part.h, 1))}
							BackgroundColor3={tint}
							BackgroundTransparency={mark}
							BorderSizePixel={0}
							ZIndex={12001}
						/>
					))}
				</frame>
			) : undefined}
			{sketched !== undefined && (
				<frame
					key="Glyph"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromOffset(glyphBox, glyphBox)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					ZIndex={12001}
				>
					<DrawnGlyph name={sketched} size={glyphBox} color={tint} transparency={mark} zIndex={12001} />
				</frame>
			)}
			{loading && (
				<CircularProgress
					size={iconSpinnerPixels(props.size)}
					thickness={2}
					color={tint}
					reducedMotion={reducedMotion}
					className={{
						AnchorPoint: new Vector2(0.5, 0.5),
						Position: new UDim2(0.5, 0, 0.5, 0),
					}}
				/>
			)}
		</SxHost>
	);
}

export default IconButton;
