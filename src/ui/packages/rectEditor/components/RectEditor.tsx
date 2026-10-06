import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import useRectEditorStyles from "./RectEditor.styles";
import { RectField, rectFields, writeRectParts } from "./rectValue";

export interface RectEditorProps {
	value: Rect;
	onChange: (value: Rect) => void;
	disabled?: boolean;
}

function RectEditor(props: CustomizedProps<Frame, RectEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useRectEditorStyles();
	const amounts = [value.Min.X, value.Min.Y, value.Max.X, value.Max.Y];

	const commit = (field: RectField, amount: number) => {
		const parts = writeRectParts(value.Min.X, value.Min.Y, value.Max.X, value.Max.Y, field, amount);
		onChange(new Rect(parts[0], parts[1], parts[2], parts[3]));
	};

	return (
		<SxHost tag="frame" key={id || "RectEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.wrap} />
			<>
			{rectFields().map((field, index) => (
				<frame key={field} {...styles.axis} LayoutOrder={index + 1}>
					<uilistlayout {...styles.row} />
					<textlabel {...styles.label} Text={field} />
					<frame {...styles.field}>
						<NumberInput
							value={amounts[index]}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(amount) => commit(field, amount)}
						/>
					</frame>
				</frame>
			))}
			</>
		</SxHost>
	);
}

export default RectEditor;
