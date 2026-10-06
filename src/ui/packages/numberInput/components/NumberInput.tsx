import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { Input } from "ui/packages/input";
import { formatNumber, parseNumberDraft } from "./numberValue";

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
}

function NumberInput(props: CustomizedProps<Frame, NumberInputProps>) {
	const { value, onChange, min, max, step, places, disabled, readOnly, loading, placeholder, width, size, reducedMotion, className, sx, id, ref } =
		props;

	return (
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
}

export default NumberInput;
