import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { useEditorHover } from "ui/packages/editorFace";
import { SxHost } from "ui/packages/host";
import { NumberInput } from "ui/packages/numberInput";
import useCFrameEditorStyles from "./CFrameEditor.styles";
import { cframeAxis, CFrameField, nextCFrameParts } from "./cframeValue";

export interface CFrameEditorProps {
	value: CFrame;
	onChange: (value: CFrame) => void;
	disabled?: boolean;
}

const POSITION: CFrameField[] = ["X", "Y", "Z"];
const ORIENTATION: CFrameField[] = ["RX", "RY", "RZ"];

function CFrameEditor(props: CustomizedProps<Frame, CFrameEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useCFrameEditorStyles();
	const hover = useEditorHover(disabled);
	const [rx, ry, rz] = value.ToEulerAnglesXYZ();
	const degrees = [math.deg(rx), math.deg(ry), math.deg(rz)];
	const amounts = [value.X, value.Y, value.Z, degrees[0], degrees[1], degrees[2]];

	const commit = (field: CFrameField, amount: number) => {
		const parts = nextCFrameParts(value.X, value.Y, value.Z, degrees[0], degrees[1], degrees[2], field, amount);
		onChange(
			new CFrame(parts[0], parts[1], parts[2]).mul(
				CFrame.Angles(math.rad(parts[3]), math.rad(parts[4]), math.rad(parts[5])),
			),
		);
	};

	const group = (title: string, fields: CFrameField[], order: number, offset: number) => (
		<frame key={title} {...styles.group} LayoutOrder={order}>
			<uilistlayout {...styles.wrap} />
			<textlabel {...styles.groupLabel} Text={title} LayoutOrder={1} />
			<frame key="Axes" {...styles.axes} LayoutOrder={2}>
				<uilistlayout {...styles.row} />
				<>
					{fields.map((field, index) => (
						<frame key={field} {...styles.axis} LayoutOrder={index + 1}>
							<uilistlayout {...styles.row} />
							<textlabel
								{...cx<TextLabel>(
									styles.label,
									cframeAxis(field) === "X"
										? styles.labelX
										: cframeAxis(field) === "Y"
											? styles.labelY
											: styles.labelZ,
								)}
								Text={cframeAxis(field)}
							/>
							<frame {...styles.field}>
								<NumberInput
									value={amounts[offset + index]}
									places={3}
									disabled={disabled}
									size="small"
									width={new UDim(1, 0)}
									onChange={(amount) => commit(field, amount)}
								/>
							</frame>
						</frame>
					))}
				</>
			</frame>
		</frame>
	);

	return (
		<SxHost tag="frame" key={id || "CFrameEditor"} hostRef={ref} base={{ ...styles.root, ...hover.face }} className={className} sx={sx} state={{ disabled }} Event={hover.event}>
			<uilistlayout {...styles.wrap} />
			{group("Position", POSITION, 1, 0)}
			{group("Rotation (degrees)", ORIENTATION, 2, 3)}
		</SxHost>
	);
}

export default CFrameEditor;
