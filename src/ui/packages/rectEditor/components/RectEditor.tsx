import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { useEditorHover } from "ui/packages/editorFace";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import useRectEditorStyles from "./RectEditor.styles";
import { RectField, writeRectParts } from "./rectValue";

export interface RectEditorProps {
	value: Rect;
	onChange: (value: Rect) => void;
	disabled?: boolean;
}

const GROUPS: Array<{ title: string; fields: RectField[] }> = [
	{ title: "Min", fields: ["MinX", "MinY"] },
	{ title: "Max", fields: ["MaxX", "MaxY"] },
];

function RectEditor(props: CustomizedProps<Frame, RectEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useRectEditorStyles();
	const hover = useEditorHover(disabled);
	const amounts: { [key: string]: number } = {
		MinX: value.Min.X,
		MinY: value.Min.Y,
		MaxX: value.Max.X,
		MaxY: value.Max.Y,
	};

	const commit = (field: RectField, amount: number) => {
		const parts = writeRectParts(value.Min.X, value.Min.Y, value.Max.X, value.Max.Y, field, amount);
		onChange(new Rect(parts[0], parts[1], parts[2], parts[3]));
	};

	return (
		<SxHost tag="frame" key={id || "RectEditor"} hostRef={ref} base={{ ...styles.root, ...hover.face }} className={className} sx={sx} state={{ disabled }} Event={hover.event}>
			<uilistlayout {...styles.wrap} />
			<>
				{GROUPS.map((group, groupIndex) => (
					<frame key={group.title} {...styles.group} LayoutOrder={groupIndex + 1}>
						<uilistlayout {...styles.wrap} />
						<textlabel {...styles.groupLabel} Text={group.title} LayoutOrder={1} />
						<frame key="Pair" {...styles.group} LayoutOrder={2}>
							<uilistlayout {...styles.pair} />
							<>
								{group.fields.map((field, index) => (
									<frame key={field} {...styles.cell} LayoutOrder={index + 1}>
										<uilistlayout {...styles.stack} />
										<textlabel {...styles.label} Text={field} LayoutOrder={1} />
										<frame {...styles.field} LayoutOrder={2}>
											<NumberInput
												value={amounts[field]}
												places={4}
												disabled={disabled}
												width={new UDim(1, 0)}
												onChange={(amount) => commit(field, amount)}
											/>
										</frame>
									</frame>
								))}
							</>
						</frame>
					</frame>
				))}
			</>
		</SxHost>
	);
}

export default RectEditor;
