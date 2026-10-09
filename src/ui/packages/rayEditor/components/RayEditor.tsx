import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { useEditorHover } from "ui/packages/editorFace";
import { SxHost } from "ui/packages/host";
import { VectorEditor } from "ui/packages/vectorEditor";
import useRayEditorStyles from "./RayEditor.styles";

export interface RayEditorProps {
	value: Ray;
	onChange: (value: Ray) => void;
	disabled?: boolean;
}

function RayEditor(props: CustomizedProps<Frame, RayEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useRayEditorStyles();
	const hover = useEditorHover(disabled);

	return (
		<SxHost tag="frame" key={id || "RayEditor"} hostRef={ref} base={{ ...styles.root, ...hover.face }} className={className} sx={sx} state={{ disabled }} Event={hover.event}>
			<uilistlayout {...styles.column} />
			<frame key="Origin" {...styles.row} LayoutOrder={1}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Origin" />
				<VectorEditor
					value={value.Origin}
					disabled={disabled}
					onChange={(origin) => onChange(new Ray(origin as Vector3, value.Direction))}
				/>
			</frame>
			<frame key="Direction" {...styles.row} LayoutOrder={2}>
				<uilistlayout {...styles.column} />
				<textlabel {...styles.label} Text="Direction" />
				<VectorEditor
					value={value.Direction}
					disabled={disabled}
					onChange={(direction) => onChange(new Ray(value.Origin, direction as Vector3))}
				/>
			</frame>
		</SxHost>
	);
}

export default RayEditor;
