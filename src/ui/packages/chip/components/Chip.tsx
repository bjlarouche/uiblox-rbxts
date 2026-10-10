import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { IconButton } from "ui/packages/iconButton";
import useChipStyles, { ChipColor } from "./Chip.styles";

export interface ChipProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	size?: ControlSize;
	variant?: "filled" | "outlined";
	color?: ChipColor;
	onActivated?: () => void;
	onDelete?: () => void;
}

function Chip(props: CustomizedProps<TextButton, ChipProps>) {
	const { label, selected, disabled, size, variant = "filled", color = "default", onActivated, onDelete, className, sx, id, ref } = props;
	const deletable = onDelete !== undefined;
	const styles = useChipStyles({ selected, disabled, deletable, size, variant, color });
	return (
		<SxHost
			tag="textbutton"
			key={id || "Chip"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, selected }}
			Text={deletable ? "" : label}
			Event={{
				Activated: () => {
					if (disabled !== true) onActivated?.();
				},
			}}
		>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
			{deletable && (
				<>
					<uilistlayout {...styles.row} />
					<textlabel key="Label" {...styles.label} Text={label} />
					<IconButton
						id="Delete"
						glyph="close"
						iconSize={styles.glyph.Size.X.Offset}
						tint={styles.glyph.ImageColor3}
						disabled={disabled}
						className={styles.delete}
						onClick={onDelete}
					/>
				</>
			)}
		</SxHost>
	);
}

export default Chip;
