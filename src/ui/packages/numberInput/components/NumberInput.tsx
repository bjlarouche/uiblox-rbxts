import React from "@rbxts/react";
import { ControlSize, CustomizedProps, useTheme } from "theme";
import { Input } from "ui/packages/input";
import { formatNumber, parseNumberDraft, stepNumber } from "./numberValue";

export interface NumberInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	places?: number;
	disabled?: boolean;
	readOnly?: boolean;
	loading?: boolean;
	placeholder?: string;
	width?: UDim;
	size?: ControlSize;
	reducedMotion?: boolean;
	stepper?: boolean;
}

function StepButton(props: { text: string; order: number; enabled: boolean; onClick: () => void }) {
	const { theme } = useTheme();
	return (
		<textbutton
			LayoutOrder={props.order}
			Size={UDim2.fromOffset(28, 28)}
			BackgroundColor3={theme.palette.surface.paper}
			BackgroundTransparency={props.enabled ? 0 : 0.45}
			BorderSizePixel={0}
			Text={props.text}
			Font={theme.typography.fontFamilies.default}
			TextSize={theme.typography.fontSizes.body}
			TextColor3={props.enabled ? theme.palette.text.primary : theme.palette.text.secondary}
			AutoButtonColor={props.enabled}
			Active={props.enabled}
			Event={{
				Activated: () => {
					if (props.enabled) props.onClick();
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, theme.shape.borderRadius)} />
		</textbutton>
	);
}

function NumberInput(props: CustomizedProps<Frame, NumberInputProps>) {
	const { value, onChange, min, max, step, places, disabled, readOnly, loading, placeholder, width, size, reducedMotion, stepper, className, sx, id, ref } =
		props;
	const locked = disabled === true || readOnly === true;
	const field = (
		<Input
			id={id || "NumberInput"}
			ref={ref}
			className={className}
			sx={sx}
			text={places !== undefined ? formatNumber(value, places) : tostring(value)}
			placeholder={placeholder}
			width={width}
			disabled={disabled}
			readOnly={readOnly}
			loading={loading}
			size={size}
			reducedMotion={reducedMotion}
			onTextChanged={(text) => {
				const committed = parseNumberDraft(text, min, max, step);
				if (committed === undefined) return;
				if (places !== undefined && formatNumber(committed, places) === formatNumber(value, places)) return;
				if (committed !== value) onChange(committed);
			}}
		/>
	);
	if (stepper !== true) return field;
	const down = stepNumber(value, -1, min, max, step);
	const up = stepNumber(value, 1, min, max, step);
	return (
		<frame Size={UDim2.fromScale(0, 0)} AutomaticSize={Enum.AutomaticSize.XY} BackgroundTransparency={1} BorderSizePixel={0}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, 4)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<StepButton text="-" order={0} enabled={!locked && down !== undefined} onClick={() => down !== undefined && onChange(down)} />
			<frame LayoutOrder={1} Size={UDim2.fromScale(0, 0)} AutomaticSize={Enum.AutomaticSize.XY} BackgroundTransparency={1} BorderSizePixel={0}>
				{field}
			</frame>
			<StepButton text="+" order={2} enabled={!locked && up !== undefined} onClick={() => up !== undefined && onChange(up)} />
		</frame>
	);
}

export default NumberInput;
