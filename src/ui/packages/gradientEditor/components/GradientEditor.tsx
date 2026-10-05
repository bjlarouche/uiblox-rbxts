import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { ColorSequenceEditor, NumberSequenceEditor } from "ui/packages/colorPicker";
import { NumberInput } from "ui/packages/numberInput";
import { Switch } from "ui/packages/switch";
import { VectorEditor } from "ui/packages/vectorEditor";
import useGradientEditorStyles from "./GradientEditor.styles";
import { GradientValue, patchGradientEnabled, patchGradientRotation } from "./gradientValue";

export interface GradientEditorProps {
	value: GradientValue;
	onChange: (value: GradientValue) => void;
	disabled?: boolean;
}

export type { GradientValue };

function GradientEditor(props: CustomizedProps<Frame, GradientEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useGradientEditorStyles();

	return (
		<frame key={id || "GradientEditor"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.column} />
			<frame key="Color" {...styles.row} LayoutOrder={1}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Color" />
				<ColorSequenceEditor
					value={value.color}
					disabled={disabled}
					onChange={(color) => onChange({ ...value, color })}
				/>
			</frame>
			<frame key="Transparency" {...styles.row} LayoutOrder={2}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Transparency" />
				<NumberSequenceEditor
					value={value.transparency}
					disabled={disabled}
					onChange={(transparency) => onChange({ ...value, transparency })}
				/>
			</frame>
			<frame key="Rotation" {...styles.row} LayoutOrder={3}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Rotation" />
				<NumberInput
					value={value.rotation}
					disabled={disabled}
					width={new UDim(1, 0)}
					onChange={(rotation) => onChange(patchGradientRotation(value, rotation))}
				/>
			</frame>
			<frame key="Offset" {...styles.row} LayoutOrder={4}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Offset" />
				<VectorEditor
					value={value.offset}
					disabled={disabled}
					onChange={(offset) => onChange({ ...value, offset: offset as Vector2 })}
				/>
			</frame>
			<frame key="Enabled" {...styles.row} LayoutOrder={5}>
				<Switch
					value={value.enabled}
					disabled={disabled}
					label="Enabled"
					onChange={(enabled) => onChange(patchGradientEnabled(value, enabled))}
				/>
			</frame>
		</frame>
	);
}

export default GradientEditor;
