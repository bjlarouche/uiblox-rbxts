import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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
		<SxHost
			tag="textlabel"
			key={id || "FormLabel"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled }}
			Text={caption}
		/>
	);
}

export default FormLabel;
