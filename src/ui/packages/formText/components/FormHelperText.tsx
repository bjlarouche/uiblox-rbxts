import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import useFormTextStyles from "./FormText.styles";

export interface FormHelperTextProps {
	text: string;
	hasError?: boolean;
	disabled?: boolean;
}

function FormHelperText(props: CustomizedProps<TextLabel, FormHelperTextProps>) {
	const { text, hasError, disabled, className, sx, id, ref } = props;
	const styles = useFormTextStyles({ hasError, disabled });
	return (
		<textlabel key={id || "FormHelperText"} ref={ref} {...styles.root} {...className} {...sx} Text={text} />
	);
}

export default FormHelperText;
