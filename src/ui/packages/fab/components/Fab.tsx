import React, { useEffect, useState } from "@rbxts/react";
import { controlFade, CustomizedProps, focusRing, useTheme } from "theme";
import { Icons } from "ui/enums";
import { canActivate } from "ui/packages/button/components/activation";
import { CircularProgress } from "ui/packages/circularProgress";
import { SxHost } from "ui/packages/host";
import { Shadow } from "ui/packages/shadow";
import { FabSize, fabExtended, fabIconPixels } from "./fabSize";
import useFabStyles, { FabColor } from "./Fab.styles";

export interface FabProps {
	icon: Icons;
	label?: string;
	size?: FabSize;
	color?: FabColor;
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
		color = "primary",
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
	const styles = useFabStyles({ size, color, disabled: !active, extended });
	const { theme } = useTheme();
	const tone = color === "accent" ? theme.palette.accent : theme.palette.primary;
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
		<SxHost
			tag="textbutton"
			key={id || "Fab"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, loading, hover: hovering, focused }}
			Active={active}
			Selectable={active}
			BackgroundColor3={active && hovering ? tone.hover : tone.main}
			BackgroundTransparency={disabled === true ? controlFade : 0}
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
			{focused && active ? <uistroke {...focusRing(theme.palette.focus)} /> : undefined}
			<Shadow />
			{extended ? (
				<frame key="Content" {...styles.content}>
					<uipadding {...styles.padding} />
					<uilistlayout {...styles.row} />
					{iconEl}
					{!loading && <textlabel key="Label" {...styles.label} Text={label} />}
				</frame>
			) : (
				iconEl
			)}
		</SxHost>
	);
}

export default Fab;
