import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { Input } from "ui/packages/input";
import { parseNumberDraft } from "./numberValue";

export interface NumberInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	placeholder?: string;
	width?: UDim;
	size?: ControlSize;
}

function NumberInput(props: CustomizedProps<Frame, NumberInputProps>) {
	const { value, onChange, min, max, step, disabled, placeholder, width, size, className, id, ref } = props;

	return (
		<Input
			id={id || "NumberInput"}
			ref={ref}
			className={className}
			text={tostring(value)}
			placeholder={placeholder}
			width={width}
			disabled={disabled}
			size={size}
			onTextChanged={(text) => {
				const committed = parseNumberDraft(text, min, max, step);
				if (committed !== undefined && committed !== value) onChange(committed);
			}}
		/>
	);
}

export default NumberInput;
