import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import useFormTextStyles from "./FormText.styles";

export interface FormLabelProps {
	text: string;
	required?: boolean;
	hasError?: boolean;
	disabled?: boolean;
}

function FormLabel(props: CustomizedProps<TextLabel, FormLabelProps>) {
	const { text, required, hasError, disabled, className, sx, id, ref } = props;
	const styles = useFormTextStyles({ hasError, disabled });
	const caption = required === true ? `${text} *` : text;
	return (
		<textlabel key={id || "FormLabel"} ref={ref} {...styles.root} {...className} {...sx} Text={caption} />
	);
}

export default FormLabel;
