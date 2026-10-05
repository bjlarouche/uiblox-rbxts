import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import useChipStyles from "./Chip.styles";

export interface ChipProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	onActivated?: () => void;
	onDelete?: () => void;
}

function Chip(props: CustomizedProps<TextButton, ChipProps>) {
	const { label, selected, disabled, onActivated, onDelete, className, sx, id, ref } = props;
	const deletable = onDelete !== undefined;
	const styles = useChipStyles({ selected, disabled, deletable });
	return (
		<textbutton
			key={id || "Chip"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
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
					<imagebutton
						key="Delete"
						{...styles.delete}
						Image={tostring(Icons.Close)}
						Active={disabled !== true}
						Event={{
							Activated: () => {
								if (disabled !== true) onDelete();
							},
						}}
					/>
				</>
			)}
		</textbutton>
	);
}

export default Chip;
