import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import useChipStyles from "./Chip.styles";

export interface ChipProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	onActivated?: () => void;
}

function Chip(props: CustomizedProps<TextButton, ChipProps>) {
	const { label, selected, disabled, onActivated, className, sx, id, ref } = props;
	const styles = useChipStyles({ selected, disabled });
	return (
		<textbutton
			key={id || "Chip"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
			Text={label}
			Event={{
				Activated: () => {
					if (disabled !== true) onActivated?.();
				},
			}}
		>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
		</textbutton>
	);
}

export default Chip;
