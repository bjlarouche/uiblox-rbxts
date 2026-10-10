import React from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { DrawnGlyph } from "./DrawnGlyph";
import { Glyph } from "./glyphs";
import useIconStyles from "./Icon.styles";

export interface IconProps {
	icon?: Icons;
	/** Drawn glyph. Wins over `icon`. */
	glyph?: Glyph;
	/** Named step, or pixels from `controlMetrics().icon`. */
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | number;
	tint?: Color3;
}

type DefaultIconComponent = ImageLabel;

function Icon(props: CustomizedProps<DefaultIconComponent, IconProps>) {
	const { icon, glyph, tint, className,
		sx, id, ref } = props;
	const { container } = useIconStyles(props);
	const color = tint ?? ((container as WriteableStyle<ImageLabel>).ImageColor3 as Color3);

	return (
		<SxHost
			tag="imagelabel"
			key={id || "Icon"}
			hostRef={ref}
			base={container}
			className={className}
			sx={sx}
			Image={glyph !== undefined || icon === undefined ? "" : tostring(icon)}
			ImageColor3={color}
		>
			{glyph !== undefined && (
				<DrawnGlyph name={glyph} size={(container as WriteableStyle<ImageLabel>).Size?.X.Offset ?? 16} color={color} />
			)}
		</SxHost>
	);
}

export default Icon;
