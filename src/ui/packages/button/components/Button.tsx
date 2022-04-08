import Roact from "@rbxts/roact";
import { CustomizedProps } from "theme";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
import useButtonStyles from "./Button.styles";

export type DefaultButtonComponent = TextButton;

export interface ButtonProps {
	text?: string;
	size?: ButtonSize;
	color?: ButtonColor;
	fullWidth?: boolean;
	variant?: ButtonVariant;
	// startIcon: Icons;
	// showStartIcon?: boolean;
	// endIcon: Icons;
	// showEndIcon?: boolean;
	disabled?: boolean;
	loading?: boolean;
	rounded?: boolean;
}

function Button<T extends DefaultButtonComponent>(props: CustomizedProps<T, ButtonProps>) {
	const {
		text = "",
		variant = "contained",
		disabled = false,
		loading = false,
		rounded = false,
		className,
		[Roact.Children]: children,
	} = props;

	const { root, font, corner, stroke } = useButtonStyles(props);

	return (
		<textbutton Key={"Button"} {...root} {...font} Active={!disabled && !loading} Text={text} {...className}>
			{variant === "outlined" && <uistroke {...stroke} />}
			{rounded && <uicorner {...corner} />}
			{children}
		</textbutton>
	);
}

export default Button;
