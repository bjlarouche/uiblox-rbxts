import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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
		<SxHost tag="frame" key={id || "GradientEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.column} />
			<frame key="Color" {...styles.block} LayoutOrder={1}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Color" LayoutOrder={1} />
				<ColorSequenceEditor
					value={value.color}
					disabled={disabled}
					onChange={(color) => onChange({ ...value, color })}
				/>
			</frame>
			<frame key="Transparency" {...styles.block} LayoutOrder={2}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Transparency" LayoutOrder={1} />
				<NumberSequenceEditor
					value={value.transparency}
					disabled={disabled}
					onChange={(transparency) => onChange({ ...value, transparency })}
				/>
			</frame>
			<frame key="Metrics" {...styles.metrics} LayoutOrder={3}>
				<uilistlayout {...styles.metricsRow} />
				<frame key="Rotation" {...styles.metric} LayoutOrder={1}>
					<uilistlayout {...styles.metricInner} />
					<textlabel {...styles.metricLabel} Text="Rotation" LayoutOrder={1} />
					<frame {...styles.metricField} LayoutOrder={2}>
						<NumberInput
							value={value.rotation}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(rotation) => onChange(patchGradientRotation(value, rotation))}
						/>
					</frame>
				</frame>
				<frame key="Offset" {...styles.metric} LayoutOrder={2}>
					<uilistlayout {...styles.column} />
					<textlabel {...styles.metricLabel} Text="Offset" LayoutOrder={1} />
					<VectorEditor
						value={value.offset}
						disabled={disabled}
						onChange={(offset) => onChange({ ...value, offset: offset as Vector2 })}
					/>
				</frame>
			</frame>
			<frame key="Enabled" {...styles.block} LayoutOrder={4}>
				<Switch
					value={value.enabled}
					disabled={disabled}
					label="Enabled"
					onChange={(enabled) => onChange(patchGradientEnabled(value, enabled))}
				/>
			</frame>
		</SxHost>
	);
}

export default GradientEditor;
