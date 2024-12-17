import React, { useState } from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import useIconButtonStyles from "./IconButton.styles";

export interface IconButtonProps {
	icon: Icons;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint: Color3;
	selected?: boolean;
	onClick?: () => void;
}

type DefaultIconButtonComponent = ImageButton;

function IconButton(props: CustomizedProps<DefaultIconButtonComponent, IconButtonProps>) {
	const { icon, selected, tint, onClick, className, key } = props;
	const { container } = useIconButtonStyles(props);

	const [hovering, setHovering] = useState(false);

	return (
		<imagebutton
			key={key || "IconButton"}
			{...container}
			{...className}
			BackgroundTransparency={hovering || selected ? 0.5 : 1}
			Image={tostring(icon)}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
			Event={{
				MouseButton1Click: () => {
					if (onClick) {
						onClick();
					}
				},
				MouseEnter: () => {
					setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
				},
			}}
		/>
	);
}

export default IconButton;
