import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { Input } from "ui/packages/input";
import { NumberInput } from "ui/packages/numberInput";
import useColorPickerStyles from "./ColorPicker.styles";
import {
	byteToUnit,
	channelToByte,
	colorToHex,
	hsvToColor3,
	parseHex,
	resolveHsv,
	sameColor,
} from "./colorValue";

export interface ColorPickerProps {
	value: Color3;
	onChange: (value: Color3) => void;
	disabled?: boolean;
}

const HUE_STOPS = [
	new ColorSequenceKeypoint(0, new Color3(1, 0, 0)),
	new ColorSequenceKeypoint(1 / 6, new Color3(1, 1, 0)),
	new ColorSequenceKeypoint(2 / 6, new Color3(0, 1, 0)),
	new ColorSequenceKeypoint(3 / 6, new Color3(0, 1, 1)),
	new ColorSequenceKeypoint(4 / 6, new Color3(0, 0, 1)),
	new ColorSequenceKeypoint(5 / 6, new Color3(1, 0, 1)),
	new ColorSequenceKeypoint(1, new Color3(1, 0, 0)),
];

function pointerInput(input: InputObject) {
	return (
		input.UserInputType === Enum.UserInputType.MouseButton1 ||
		input.UserInputType === Enum.UserInputType.Touch ||
		input.UserInputType === Enum.UserInputType.MouseMovement
	);
}

function ColorPicker(props: CustomizedProps<Frame, ColorPickerProps>) {
	const { value, onChange, disabled, className, id, ref } = props;
	const styles = useColorPickerStyles();
	const active = canActivate(disabled);
	const hsvRef = useRef(resolveHsv(value));
	const [hsv, setHsv] = useState(hsvRef.current);
	const [hexDraft, setHexDraft] = useState(colorToHex(value));
	const [hexFault, setHexFault] = useState(false);
	const [focused, setFocused] = useState(false);
	const dragging = useRef<"plane" | "hue" | undefined>(undefined);
	const latest = useRef(value);

	useEffect(() => {
		if (sameColor(value, latest.current)) return;
		latest.current = value;
		const resolved = resolveHsv(value, hsvRef.current);
		hsvRef.current = resolved;
		setHsv(resolved);
		setHexDraft(colorToHex(value));
		setHexFault(false);
	}, [value]);

	const emit = (hsvValue: { h: number; s: number; v: number }) => {
		hsvRef.current = hsvValue;
		setHsv(hsvValue);
		const color = hsvToColor3(hsvValue.h, hsvValue.s, hsvValue.v);
		if (sameColor(color, latest.current)) return;
		latest.current = color;
		setHexDraft(colorToHex(color));
		setHexFault(false);
		onChange(color);
	};

	const updatePlane = (rbx: Frame, position: Vector3) => {
		const size = rbx.AbsoluteSize;
		if (size.X <= 0 || size.Y <= 0) return;
		const origin = rbx.AbsolutePosition;
		emit({
			h: hsvRef.current.h,
			s: math.clamp((position.X - origin.X) / size.X, 0, 1),
			v: 1 - math.clamp((position.Y - origin.Y) / size.Y, 0, 1),
		});
	};

	const updateHue = (rbx: Frame, position: Vector3) => {
		const width = rbx.AbsoluteSize.X;
		if (width <= 0) return;
		emit({
			h: math.clamp((position.X - rbx.AbsolutePosition.X) / width, 0, 1),
			s: hsvRef.current.s,
			v: hsvRef.current.v,
		});
	};

	const hueColor = hsvToColor3(hsv.h, 1, 1);
	const channel = (label: string, unit: number, apply: (byte: number) => void) => (
		<frame key={label} {...styles.channel}>
			<uilistlayout {...styles.rowLayout} />
			<textlabel {...styles.label} Text={label} />
			<frame {...styles.channelField}>
				<NumberInput
					value={channelToByte(unit)}
					min={0}
					max={255}
					step={1}
					disabled={disabled}
					width={new UDim(1, 0)}
					onChange={(byte) => apply(byte)}
				/>
			</frame>
		</frame>
	);

	return (
		<frame
			key={id || "ColorPicker"}
			ref={ref}
			{...styles.root}
			{...className}
			BackgroundTransparency={focused && active ? 0.85 : 1}
			Selectable={active}
			Event={{
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<uilistlayout {...styles.column} />
			<frame key="Header" {...styles.row} LayoutOrder={1}>
				<uilistlayout {...styles.rowLayout} />
				<frame key="Swatch" {...styles.swatch} BackgroundColor3={value} LayoutOrder={1}>
					<uicorner {...styles.corner} />
					<uistroke {...styles.swatchStroke} />
				</frame>
				<frame key="Hex" {...styles.hex} LayoutOrder={2}>
					<Input
						text={hexDraft}
						placeholder="#RRGGBB"
						disabled={disabled}
						hasError={hexFault}
						width={new UDim(1, 0)}
						onInput={(text) => {
							setHexDraft(text);
							const parsed = parseHex(text);
							if (parsed === undefined) {
								setHexFault(text.size() > 0);
								return;
							}
							setHexFault(false);
							emit(resolveHsv(parsed, hsvRef.current));
						}}
						onTextChanged={(text) => {
							const parsed = parseHex(text);
							if (parsed === undefined) {
								setHexFault(false);
								setHexDraft(colorToHex(latest.current));
								return;
							}
							setHexFault(false);
							emit(resolveHsv(parsed, hsvRef.current));
						}}
					/>
				</frame>
			</frame>
			<frame
				key="Plane"
				{...styles.plane}
				BackgroundColor3={hueColor}
				LayoutOrder={2}
				Selectable={active}
				Active={active}
				Event={{
					InputBegan: (rbx, input) => {
						if (!active || !pointerInput(input) || input.UserInputType === Enum.UserInputType.MouseMovement)
							return;
						dragging.current = "plane";
						updatePlane(rbx, input.Position);
					},
					InputChanged: (rbx, input) => {
						if (dragging.current === "plane" && pointerInput(input)) updatePlane(rbx, input.Position);
					},
					InputEnded: (_, input) => {
						if (pointerInput(input)) dragging.current = undefined;
					},
					MouseLeave: () => {
						dragging.current = undefined;
					},
				}}
			>
				<uicorner {...styles.corner} />
				<uigradient Color={new ColorSequence(new Color3(1, 1, 1), hueColor)} />
				<frame key="Shade" {...styles.planeOverlay}>
					<uicorner {...styles.corner} />
					<uigradient
						Rotation={90}
						Transparency={new NumberSequence([
							new NumberSequenceKeypoint(0, 1),
							new NumberSequenceKeypoint(1, 0),
						])}
					/>
				</frame>
				<frame key="Cursor" {...styles.cursor} Position={UDim2.fromScale(hsv.s, 1 - hsv.v)}>
					<uicorner CornerRadius={new UDim(1, 0)} />
					<uistroke {...styles.cursorStroke} />
				</frame>
			</frame>
			<frame
				key="Hue"
				{...styles.hue}
				LayoutOrder={3}
				Selectable={active}
				Active={active}
				Event={{
					InputBegan: (rbx, input) => {
						if (!active || !pointerInput(input) || input.UserInputType === Enum.UserInputType.MouseMovement)
							return;
						dragging.current = "hue";
						updateHue(rbx, input.Position);
					},
					InputChanged: (rbx, input) => {
						if (dragging.current === "hue" && pointerInput(input)) updateHue(rbx, input.Position);
					},
					InputEnded: (_, input) => {
						if (pointerInput(input)) dragging.current = undefined;
					},
					MouseLeave: () => {
						dragging.current = undefined;
					},
				}}
			>
				<uicorner {...styles.corner} />
				<uigradient Color={new ColorSequence(HUE_STOPS)} />
				<frame key="Knob" {...styles.hueKnob} Position={UDim2.fromScale(hsv.h, 0.5)}>
					<uicorner {...styles.corner} />
				</frame>
			</frame>
			<frame key="Rgb" {...styles.row} LayoutOrder={4} Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y}>
				<uilistlayout {...styles.rowLayout} />
				{channel("R", value.R, (byte) =>
					emit(resolveHsv(new Color3(byteToUnit(byte), value.G, value.B), hsvRef.current)),
				)}
				{channel("G", value.G, (byte) =>
					emit(resolveHsv(new Color3(value.R, byteToUnit(byte), value.B), hsvRef.current)),
				)}
				{channel("B", value.B, (byte) =>
					emit(resolveHsv(new Color3(value.R, value.G, byteToUnit(byte)), hsvRef.current)),
				)}
			</frame>
		</frame>
	);
}

export default ColorPicker;
