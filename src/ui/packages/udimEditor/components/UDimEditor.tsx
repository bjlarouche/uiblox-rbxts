import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { useEditorHover } from "ui/packages/editorFace";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import { writeUDim, writeUDim2 } from "ui/packages/vectorEditor/components/vectorValue";
import useUDimEditorStyles from "./UDimEditor.styles";

export interface UDimEditorProps {
	value: UDim | UDim2;
	onChange: (value: UDim | UDim2) => void;
	disabled?: boolean;
}

function UDimEditor(props: CustomizedProps<Frame, UDimEditorProps>) {
	const { value, onChange, disabled, className,
		sx, id, ref } = props;
	const styles = useUDimEditorStyles();
	const hover = useEditorHover(disabled);
	const isUDim2 = typeOf(value) === "UDim2";

	const field = (key: string, label: string, amount: number, commit: (value: number) => void, order: number) => (
		<frame key={key} {...styles.field} LayoutOrder={order}>
			<uilistlayout {...styles.row} />
			<textlabel {...styles.label} Text={label} />
			<frame {...styles.input}>
				<NumberInput value={amount} disabled={disabled} width={new UDim(1, 0)} onChange={commit} />
			</frame>
		</frame>
	);

	return (
		<SxHost tag="frame" key={id || "UDimEditor"} hostRef={ref} base={{ ...styles.root, ...hover.face }} className={className} sx={sx} state={{ disabled }} Event={hover.event}>
			<uilistlayout {...styles.column} />
			{isUDim2 ? (
				<frame key="Axes" Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1} LayoutOrder={1}>
					<uilistlayout {...styles.column} />
					<frame key="X" {...styles.axis} LayoutOrder={1}>
						<uilistlayout {...styles.row} />
						{field("XS", "XS", (value as UDim2).X.Scale, (amount) => onChange(writeUDim2(value as UDim2, "X", "Scale", amount)), 1)}
						{field("XO", "XO", (value as UDim2).X.Offset, (amount) => onChange(writeUDim2(value as UDim2, "X", "Offset", amount)), 2)}
					</frame>
					<frame key="Y" {...styles.axis} LayoutOrder={2}>
						<uilistlayout {...styles.row} />
						{field("YS", "YS", (value as UDim2).Y.Scale, (amount) => onChange(writeUDim2(value as UDim2, "Y", "Scale", amount)), 1)}
						{field("YO", "YO", (value as UDim2).Y.Offset, (amount) => onChange(writeUDim2(value as UDim2, "Y", "Offset", amount)), 2)}
					</frame>
				</frame>
			) : (
				<frame key="UDim" {...styles.axis} LayoutOrder={1}>
					<uilistlayout {...styles.row} />
					{field("S", "S", (value as UDim).Scale, (amount) => onChange(writeUDim(value as UDim, "Scale", amount)), 1)}
					{field("O", "O", (value as UDim).Offset, (amount) => onChange(writeUDim(value as UDim, "Offset", amount)), 2)}
				</frame>
			)}
		</SxHost>
	);
}

export default UDimEditor;
