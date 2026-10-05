import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { Icons } from "ui/enums";
import { canActivate } from "ui/packages/button/components/activation";
import { CircularProgress } from "ui/packages/circularProgress";
import { Shadow } from "ui/packages/shadow";
import { FabSize, fabIconPixels } from "./fabSize";
import useFabStyles from "./Fab.styles";

export interface FabProps {
	icon: Icons;
	size?: FabSize;
	disabled?: boolean;
	loading?: boolean;
	reducedMotion?: boolean;
	onClick?: () => void;
}

function Fab(props: CustomizedProps<TextButton, FabProps>) {
	const { icon, size = "medium", disabled, loading = false, reducedMotion, onClick, className, sx, id, ref } = props;
	const active = canActivate(disabled, loading);
	const styles = useFabStyles({ size, disabled: !active });
	const { theme } = useTheme();
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const iconPx = fabIconPixels(size);

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
	}, [active]);

	return (
		<textbutton
			key={id || "Fab"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
			Active={active}
			Selectable={active}
			BackgroundTransparency={!active ? 0.5 : hovering || focused ? 0.15 : 0}
			Event={{
				Activated: () => {
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
			<uicorner {...styles.corner} />
			<Shadow />
			{loading ? (
				<CircularProgress
					size={iconPx}
					thickness={2}
					color={theme.palette.primary.on}
					reducedMotion={reducedMotion}
					className={{
						AnchorPoint: new Vector2(0.5, 0.5),
						Position: UDim2.fromScale(0.5, 0.5),
					}}
				/>
			) : (
				<imagelabel
					key="Icon"
					{...styles.icon}
					Size={UDim2.fromOffset(iconPx, iconPx)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromScale(0.5, 0.5)}
					Image={tostring(icon)}
				/>
			)}
		</textbutton>
	);
}

export default Fab;
