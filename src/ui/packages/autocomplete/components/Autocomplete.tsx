import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Select, SelectProps } from "ui/packages/select";
import { autocompleteSearchable } from "./autocompleteSearchable";

export type AutocompleteProps<T> = SelectProps<T>;

function Autocomplete<T>(props: CustomizedProps<Frame, AutocompleteProps<T>>) {
	const {
		value,
		values,
		options,
		onChange,
		disabled,
		loading,
		placeholder,
		searchable,
		reducedMotion,
		size,
		className,
		sx,
		id,
		ref,
	} = props;
	return (
		<Select
			value={value}
			values={values}
			options={options}
			onChange={onChange}
			disabled={disabled}
			loading={loading}
			placeholder={placeholder}
			searchable={autocompleteSearchable(searchable)}
			reducedMotion={reducedMotion}
			size={size}
			className={className}
			sx={sx}
			id={id || "Autocomplete"}
			ref={ref}
		/>
	);
}

export default Autocomplete;
