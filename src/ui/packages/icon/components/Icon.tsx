import React from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import useIconStyles from "./Icon.styles";

export interface IconProps {
	icon: Icons;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint?: Color3;
}

type DefaultIconComponent = ImageLabel;

function Icon(props: CustomizedProps<DefaultIconComponent, IconProps>) {
	const { icon, tint, className,
		sx, id, ref } = props;
	const { container } = useIconStyles(props);

	return (
		<SxHost
			tag="imagelabel"
			key={id || "Icon"}
			hostRef={ref}
			base={container}
			className={className}
			sx={sx}
			Image={tostring(icon)}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
		/>
	);
}

export default Icon;
