import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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
		<SxHost
			tag="textlabel"
			key={id || "FormHelperText"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled }}
			Text={text}
		/>
	);
}

export default FormHelperText;
