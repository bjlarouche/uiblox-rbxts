import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { Icons } from "ui/enums";
import { canActivate } from "ui/packages/button/components/activation";
import { CircularProgress } from "ui/packages/circularProgress";
import { Shadow } from "ui/packages/shadow";
import { FabSize, fabExtended, fabIconPixels } from "./fabSize";
import useFabStyles from "./Fab.styles";

export interface FabProps {
	icon: Icons;
	label?: string;
	size?: FabSize;
	disabled?: boolean;
	loading?: boolean;
	reducedMotion?: boolean;
	onClick?: () => void;
}

function Fab(props: CustomizedProps<TextButton, FabProps>) {
	const {
		icon,
		label,
		size = "medium",
		disabled,
		loading = false,
		reducedMotion,
		onClick,
		className,
		sx,
		id,
		ref,
	} = props;
	const active = canActivate(disabled, loading);
	const extended = fabExtended(label);
	const styles = useFabStyles({ size, disabled: !active, extended });
	const { theme } = useTheme();
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const iconPx = fabIconPixels(size);

	useEffect(() => {
		if (active) return;
		setHovering(false);
		setFocused(false);
	}, [active]);

	const iconEl = loading ? (
		<CircularProgress
			size={iconPx}
			thickness={2}
			color={theme.palette.primary.on}
			reducedMotion={reducedMotion}
			className={
				extended
					? { LayoutOrder: 1 }
					: {
							AnchorPoint: new Vector2(0.5, 0.5),
							Position: UDim2.fromScale(0.5, 0.5),
						}
			}
		/>
	) : (
		<imagelabel
			key="Icon"
			{...styles.icon}
			Size={UDim2.fromOffset(iconPx, iconPx)}
			AnchorPoint={extended ? new Vector2(0, 0) : new Vector2(0.5, 0.5)}
			Position={extended ? UDim2.fromScale(0, 0) : UDim2.fromScale(0.5, 0.5)}
			Image={tostring(icon)}
		/>
	);

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
			{extended ? (
				<>
					<uipadding {...styles.padding} />
					<uilistlayout {...styles.row} />
					{iconEl}
					{!loading && <textlabel key="Label" {...styles.label} Text={label} />}
				</>
			) : (
				iconEl
			)}
		</textbutton>
	);
}

export default Fab;
