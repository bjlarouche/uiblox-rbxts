import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
import { classNames, CustomizedProps, WriteableStyle } from "theme";
import { Divider } from "../../divider";
import { Orientations } from "ui/enums";
import { InputColor, InputMargin, InputVariant } from "../types";
import useInputStyles from "./Input.styles";

export type DefaultInputComponent = Frame;

export interface InputProps {
	color?: InputColor;
	disabled?: boolean;
	hasError?: boolean;
	helperText?: string;
	margin?: InputMargin;
	variant?: InputVariant;
	width?: UDim;
	text?: string;
	placeholder?: string;
	rounded?: boolean;
	clearsTextOnFocus?: boolean;
	onTextChanged?: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onEnterPressed?: (text: string) => void;
}

type GenericStyle = {
	[x: string]: any;
};

const Input = hooked<CustomizedProps<DefaultInputComponent, InputProps>>((props) => {
	const {
		text,
		placeholder,
		helperText,
		variant = "standard",
		disabled = false,
		hasError = false,
		rounded = false,
		onTextChanged,
		onFocus,
		onBlur,
		onEnterPressed,
		className,
	} = props;

	const { root, font, margin, box, helper, errorColorFrame, errorColorText, divider, corner, stroke } =
		useInputStyles(props);
	const [input, setInput] = useState<string>(text ?? "");

	return (
		<frame Key="Input" {...root} {...className}>
			<frame Key="Margin" {...margin}>
				<textbox
					Key={"Field"}
					{...font}
					{...box}
					Active={!disabled}
					Text={input}
					PlaceholderText={placeholder}
					{...classNames(new Map<WriteableStyle<any>, boolean>([[errorColorText, hasError]]))}
					Event={{
						ReturnPressedFromOnScreenKeyboard: (rbx) => {
							if (onEnterPressed) {
								const text = rbx.Text;
								onEnterPressed(text);
							}
						},
						Focused: onFocus,
						FocusLost: onBlur,
						InputChanged: (rbx) => {
							if (onTextChanged) {
								const text = rbx.Text;
								onTextChanged(text);
							}
						},
					}}
				>
					{variant === "outlined" && <uistroke {...stroke} />}
					{rounded && <uicorner {...corner} />}
				</textbox>
				<Divider
					padding={0}
					orientation={Orientations.Horizontal}
					className={classNames(
						new Map<WriteableStyle<any>, boolean>([
							[errorColorFrame, hasError],
							[divider, true],
						]),
					)}
				/>
				{helperText !== undefined && (
					<textlabel
						Key={"HelperText"}
						{...font}
						{...helper}
						{...classNames(new Map<WriteableStyle<any>, boolean>([[errorColorText, hasError]]))}
						Text={helperText}
					/>
				)}
			</frame>
		</frame>
	);
});

export default Input;
