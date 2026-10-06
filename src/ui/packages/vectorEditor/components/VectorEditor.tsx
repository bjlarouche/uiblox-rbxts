import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import useVectorEditorStyles from "./VectorEditor.styles";
import { AxisKey, readAxis, writeVector2, writeVector3 } from "./vectorValue";

export interface VectorEditorProps {
	value: Vector2 | Vector3;
	onChange: (value: Vector2 | Vector3) => void;
	axes?: AxisKey[];
	disabled?: boolean;
}

function VectorEditor(props: CustomizedProps<Frame, VectorEditorProps>) {
	const { value, onChange, disabled, className,
		sx, id, ref } = props;
	const styles = useVectorEditorStyles();
	const isVector3 = typeOf(value) === "Vector3";
	const axes = props.axes ?? (isVector3 ? (["X", "Y", "Z"] as AxisKey[]) : (["X", "Y"] as AxisKey[]));

	return (
		<SxHost tag="frame" key={id || "VectorEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.row} />
			<>
			{axes.map((axis, index) => (
				<frame key={axis} {...styles.axis} Size={new UDim2(1 / axes.size(), 0, 0, 32)} LayoutOrder={index + 1}>
					<uilistlayout {...styles.row} />
					<textlabel {...styles.label} Text={axis} />
					<frame {...styles.field}>
						<NumberInput
							value={readAxis(value, axis)}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(amount) => {
								if (isVector3) onChange(writeVector3(value as Vector3, axis, amount));
								else if (axis === "X" || axis === "Y") onChange(writeVector2(value as Vector2, axis, amount));
							}}
						/>
					</frame>
				</frame>
			))}
			</>
		</SxHost>
	);
}

export default VectorEditor;
