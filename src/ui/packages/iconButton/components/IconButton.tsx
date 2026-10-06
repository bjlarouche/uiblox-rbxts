import React, { useEffect, useState } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { canActivate } from "ui/packages/button/components/activation";
import { iconSpinnerPixels } from "ui/packages/button/components/buttonLook";
import { CircularProgress } from "ui/packages/circularProgress";
import useIconButtonStyles from "./IconButton.styles";
import { transportGlyph, TransportGlyph } from "./transportGlyph";

export interface IconButtonProps {
	icon: Icons;
	glyph?: TransportGlyph;
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
	const reducedMotion = useReducedMotion(reducedProp);
	const active = canActivate(disabled, loading);
	const drawn = glyph !== undefined ? transportGlyph(glyph) : undefined;
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
	}, [active]);

	return (
		<SxHost
			tag="imagebutton"
			key={id || "IconButton"}
			hostRef={ref}
			base={container}
			className={className}
			sx={sx}
			state={{ disabled, loading, selected, hover: hovering, focused }}
			Active={active}
			AutoButtonColor={active}
			Selectable={active}
			BackgroundTransparency={loading ? 1 : !active || hovering || selected || focused ? 0.5 : 1}
			Image={drawn !== undefined ? "" : tostring(icon)}
			ImageTransparency={drawn !== undefined || loading ? 1 : 0}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
			Event={{
				MouseButton1Click: () => {
					if (active && onClick) onClick();
				},
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => setHovering(false),
				SelectionGained: () => {
					if (active) setFocused(true);
				},
				SelectionLost: () => setFocused(false),
			}}
		>
			<uicorner {...corner} />
			{drawn !== undefined ? (
				<frame
					key="Glyph"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromOffset(16, 16)}
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
							BorderSizePixel={0}
							ZIndex={12001}
						/>
					))}
				</frame>
			) : undefined}
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
