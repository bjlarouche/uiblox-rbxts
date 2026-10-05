import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Select } from "ui/packages/select";
import { enumOptions } from "./enumOptions";

export interface EnumPickerProps {
	value: EnumItem;
	items: EnumItem[];
	onChange: (value: EnumItem) => void;
	disabled?: boolean;
	searchable?: boolean;
	placeholder?: string;
}

function EnumPicker(props: CustomizedProps<Frame, EnumPickerProps>) {
	const { value, items, onChange, disabled, searchable = true, placeholder, className, sx, id, ref } = props;
	return (
		<Select
			value={value}
			options={enumOptions(items)}
			onChange={onChange}
			disabled={disabled}
			searchable={searchable}
			placeholder={placeholder}
			className={className}
			sx={sx}
			id={id || "EnumPicker"}
			ref={ref}
		/>
	);
}

export default EnumPicker;
