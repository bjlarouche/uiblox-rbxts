import React from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import useIconStyles from "./Icon.styles";

export interface IconProps {
	icon: Icons;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint?: Color3;
}

type DefaultIconComponent = ImageLabel;

function Icon(props: CustomizedProps<DefaultIconComponent, IconProps>) {
	const { icon, tint, className, key } = props;
	const { container } = useIconStyles(props);

	return (
		<imagelabel
			key={key || "Icon"}
			{...container}
			{...className}
			Image={tostring(icon)}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
		/>
	);
}

export default Icon;
