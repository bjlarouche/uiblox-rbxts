import React, { useRef, useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { NumberInput } from "ui/packages/numberInput";
import useColorPickerStyles from "./ColorPicker.styles";
import {
	hitStop,
	insertNumberStop,
	patchNumberStop,
	readNumberStops,
	removeNumberStop,
	writeNumberStops,
} from "./sequenceValue";

export interface NumberSequenceEditorProps {
	value: NumberSequence;
	onChange: (value: NumberSequence) => void;
	disabled?: boolean;
}

function NumberSequenceEditor(props: CustomizedProps<Frame, NumberSequenceEditorProps>) {
	const { value, onChange, disabled, className,
		sx, id, ref } = props;
	const styles = useColorPickerStyles();
	const active = canActivate(disabled);
	const stops = readNumberStops(value);
	const [selected, setSelected] = useState(0);
	const dragging = useRef(false);
	const index = math.clamp(selected, 0, math.max(0, stops.size() - 1));
	const current = stops[index] ?? { t: 0, value: 0, envelope: 0 };

	const commit = (updated: typeof stops) => onChange(writeNumberStops(updated));

	const atAlpha = (rbx: Frame, position: Vector3) => {
		const width = rbx.AbsoluteSize.X;
		if (width <= 0) return 0;
		return math.clamp((position.X - rbx.AbsolutePosition.X) / width, 0, 1);
	};

	return (
		<frame key={id || "NumberSequenceEditor"} ref={ref} {...styles.root} {...className} {...sx} Selectable={false}>
			<uilistlayout {...styles.column} />
			<frame
				key="Bar"
				{...styles.hue}
				BackgroundColor3={new Color3(0.2, 0.2, 0.2)}
				LayoutOrder={1}
				Active={active}
				Event={{
					InputBegan: (rbx, input) => {
						if (!active || input.UserInputType !== Enum.UserInputType.MouseButton1) return;
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
						const updated = insertNumberStop(stops, alpha);
						commit(updated);
						setSelected(hitStop(
							updated.map((stop) => stop.t),
							alpha,
							1,
						));
					},
					InputChanged: (rbx, input) => {
						if (!dragging.current || input.UserInputType !== Enum.UserInputType.MouseMovement) return;
						commit(patchNumberStop(stops, index, { t: atAlpha(rbx, input.Position) }));
					},
					InputEnded: () => {
						dragging.current = false;
					},
				}}
			>
				<uicorner {...styles.corner} />
				<uigradient Transparency={value} />
				<>
				{stops.map((stop, stopIndex) => (
					<frame
						key={`Stop-${stopIndex}`}
						{...styles.hueKnob}
						Position={UDim2.fromScale(stop.t, 0.5)}
						ZIndex={stopIndex === index ? 2 : 1}
					>
						<uicorner {...styles.corner} />
					</frame>
				))}
				</>
			</frame>
			<frame key="Fields" {...styles.row} LayoutOrder={2} Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y}>
				<uilistlayout {...styles.rowLayout} />
				<frame key="Value" {...styles.channel}>
					<uilistlayout {...styles.rowLayout} />
					<textlabel {...styles.label} Text="V" />
					<frame {...styles.channelField}>
						<NumberInput
							value={current.value}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(amount) => commit(patchNumberStop(stops, index, { value: amount }))}
						/>
					</frame>
				</frame>
				<frame key="Envelope" {...styles.channel}>
					<uilistlayout {...styles.rowLayout} />
					<textlabel {...styles.label} Text="E" />
					<frame {...styles.channelField}>
						<NumberInput
							value={current.envelope}
							disabled={disabled}
							width={new UDim(1, 0)}
							onChange={(amount) => commit(patchNumberStop(stops, index, { envelope: amount }))}
						/>
					</frame>
				</frame>
			</frame>
			{stops.size() > 2 && index > 0 && index < stops.size() - 1 && (
				<textbutton
					key="Remove"
					{...styles.link}
					Text="Remove stop"
					LayoutOrder={3}
					Event={{
						Activated: () => {
							if (!active) return;
							commit(removeNumberStop(stops, index));
							setSelected(math.max(0, index - 1));
						},
					}}
				/>
			)}
		</frame>
	);
}

export default NumberSequenceEditor;
