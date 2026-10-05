import React, { useEffect, useState } from "@rbxts/react";
import { Icons } from "ui/enums";
import { CustomizedProps, WriteableStyle } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { iconSpinnerPixels } from "ui/packages/button/components/buttonLook";
import { CircularProgress } from "ui/packages/circularProgress";
import useIconButtonStyles from "./IconButton.styles";

export interface IconButtonProps {
	icon: Icons;
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
	const { icon, selected, tint, disabled, loading = false, reducedMotion, onClick, className, id, ref } = props;
	const { container } = useIconButtonStyles(props);
	const active = canActivate(disabled, loading);
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
	}, [active]);

	return (
		<imagebutton
			key={id || "IconButton"}
			ref={ref}
			{...container}
			{...className}
			Active={active}
			AutoButtonColor={active}
			Selectable={active}
			BackgroundTransparency={loading ? 1 : !active || hovering || selected || focused ? 0.5 : 1}
			Image={tostring(icon)}
			ImageTransparency={loading ? 1 : 0}
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
		</imagebutton>
	);
}

export default IconButton;
