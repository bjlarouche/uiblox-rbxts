import React, { useState } from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useIconButtonStyles from "./IconButton.styles";

export interface IconButtonProps {
	icon: Icons;
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
	tint: Color3;
	selected?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

type DefaultIconButtonComponent = ImageButton;

function IconButton(props: CustomizedProps<DefaultIconButtonComponent, IconButtonProps>) {
	const { icon, selected, tint, disabled, onClick, className, id, ref } = props;
	const { container } = useIconButtonStyles(props);
	const active = canActivate(disabled);
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);

	return (
		<imagebutton
			key={id || "IconButton"}
			ref={ref}
			{...container}
			{...className}
			Active={active}
			Selectable={!disabled}
			BackgroundTransparency={!active || hovering || selected || focused ? 0.5 : 1}
			Image={tostring(icon)}
			ImageColor3={tint ?? (container as WriteableStyle<ImageLabel>).ImageColor3}
			Event={{
				MouseButton1Click: () => {
					if (active && onClick) onClick();
				},
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => setHovering(false),
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		/>
	);
}

export default IconButton;
