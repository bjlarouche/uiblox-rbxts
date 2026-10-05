import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { NumberInput } from "ui/packages/numberInput";
import useNumberRangeEditorStyles from "./NumberRangeEditor.styles";
import { writeNumberRange } from "./numberRangeValue";

export interface NumberRangeEditorProps {
	value: NumberRange;
	onChange: (value: NumberRange) => void;
	disabled?: boolean;
}

function NumberRangeEditor(props: CustomizedProps<Frame, NumberRangeEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useNumberRangeEditorStyles();

	const commit = (field: "Min" | "Max", amount: number) => {
		const parts = writeNumberRange(value.Min, value.Max, field, amount);
		onChange(new NumberRange(parts.Min, parts.Max));
	};

	return (
		<frame key={id || "NumberRangeEditor"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.row} />
			<frame key="Min" {...styles.axis} LayoutOrder={1}>
				<uilistlayout {...styles.row} />
				<textlabel {...styles.label} Text="Min" />
				<frame {...styles.field}>
					<NumberInput value={value.Min} disabled={disabled} width={new UDim(1, 0)} onChange={(amount) => commit("Min", amount)} />
				</frame>
			</frame>
			<frame key="Max" {...styles.axis} LayoutOrder={2}>
				<uilistlayout {...styles.row} />
				<textlabel {...styles.label} Text="Max" />
				<frame {...styles.field}>
					<NumberInput value={value.Max} disabled={disabled} width={new UDim(1, 0)} onChange={(amount) => commit("Max", amount)} />
				</frame>
			</frame>
		</frame>
	);
}

export default NumberRangeEditor;
