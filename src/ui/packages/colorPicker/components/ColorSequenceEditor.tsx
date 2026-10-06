import React, { useRef, useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { canActivate } from "ui/packages/button/components/activation";
import ColorPicker from "./ColorPicker";
import useColorPickerStyles from "./ColorPicker.styles";
import {
	hitStop,
	insertColorStop,
	patchColorStop,
	readColorStops,
	removeColorStop,
	sequenceMove,
	sequencePress,
	writeColorStops,
} from "./sequenceValue";

export interface ColorSequenceEditorProps {
	value: ColorSequence;
	onChange: (value: ColorSequence) => void;
	disabled?: boolean;
}

function ColorSequenceEditor(props: CustomizedProps<Frame, ColorSequenceEditorProps>) {
	const { value, onChange, disabled, className, sx, id, ref } = props;
	const styles = useColorPickerStyles();
	const active = canActivate(disabled);
	const stops = readColorStops(value);
	const [selected, setSelected] = useState(0);
	const dragging = useRef(false);
	const index = math.clamp(selected, 0, math.max(0, stops.size() - 1));
	const current = stops[index] ?? { t: 0, color: new Color3() };

	const commit = (updated: typeof stops) => onChange(writeColorStops(updated));

	const atAlpha = (rbx: Frame, position: Vector3) => {
		const width = rbx.AbsoluteSize.X;
		if (width <= 0) return 0;
		return math.clamp((position.X - rbx.AbsolutePosition.X) / width, 0, 1);
	};

	return (
		<SxHost tag="frame" key={id || "ColorSequenceEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }} Selectable={false}>
			<uilistlayout {...styles.column} />
			<frame
				key="Bar"
				{...styles.sequenceBar}
				LayoutOrder={1}
				Active={active}
				Event={{
					InputBegan: (rbx, input) => {
						if (!active || !sequencePress(input.UserInputType.Name)) return;
						const alpha = atAlpha(rbx, input.Position);
						const hit = hitStop(
							stops.map((stop) => stop.t),
							alpha,
							0.04,
						);
						if (hit >= 0) {
							setSelected(hit);
							dragging.current = hit > 0 && hit < stops.size() - 1;
							return;
						}
						const updated = insertColorStop(stops, alpha);
						commit(updated);
						setSelected(
							hitStop(
								updated.map((stop) => stop.t),
								alpha,
								1,
							),
						);
					},
					InputChanged: (rbx, input) => {
						if (!dragging.current || !sequenceMove(input.UserInputType.Name)) return;
						commit(patchColorStop(stops, index, { t: atAlpha(rbx, input.Position) }));
					},
					InputEnded: () => {
						dragging.current = false;
					},
				}}
			>
				<uicorner {...styles.corner} />
				<uistroke {...styles.swatchStroke} />
				<uigradient Color={value} />
				<>
					{stops.map((stop, stopIndex) => (
						<frame
							key={`Stop-${stopIndex}`}
							{...styles.stop}
							BackgroundColor3={stop.color}
							Position={UDim2.fromScale(stop.t, 0.5)}
							ZIndex={stopIndex === index ? 2 : 1}
						>
							<uicorner CornerRadius={new UDim(0, 2)} />
							<uistroke Thickness={stopIndex === index ? 2 : 1} Color={new Color3(1, 1, 1)} />
						</frame>
					))}
				</>
			</frame>
			<ColorPicker
				key="StopColor"
				value={current.color}
				disabled={disabled}
				onChange={(color) => commit(patchColorStop(stops, index, { color }))}
			/>
			{stops.size() > 2 && index > 0 && index < stops.size() - 1 && (
				<textbutton
					key="Remove"
					{...styles.link}
					Text="Remove stop"
					LayoutOrder={3}
					Event={{
						Activated: () => {
							if (!active) return;
							commit(removeColorStop(stops, index));
							setSelected(math.max(0, index - 1));
						},
					}}
				/>
			)}
		</SxHost>
	);
}

export default ColorSequenceEditor;
