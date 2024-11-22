import React, { useState } from "@rbxts/react";
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

function Input(props: CustomizedProps<DefaultInputComponent, InputProps>) {
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
		<frame key="Input" {...root} {...className}>
			<frame key="Margin" {...margin}>
				<textbox
					key={"Field"}
					{...font}
					{...box}
					Active={!disabled}
					Text={input}
					PlaceholderText={placeholder}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					{...classNames(new Map<WriteableStyle<any>, boolean>([[errorColorText, hasError]]))}
					Event={{
						ReturnPressedFromOnScreenKeyboard: (rbx) => {
							if (onEnterPressed) {
								const text = rbx.Text;
								onEnterPressed(text);
							}
						},
						Focused: onFocus,
						FocusLost: (rbx) => {
							if (onTextChanged) {
								const text = rbx.Text;
								onTextChanged(text);
							}

							if (onBlur) {
								onBlur();
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
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						new Map<WriteableStyle<any>, boolean>([
							[errorColorFrame, hasError],
							[divider, true],
						]),
					)}
				/>
				{helperText !== undefined && (
					<textlabel
						key={"HelperText"}
						{...font}
						{...helper}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						{...classNames(new Map<WriteableStyle<any>, boolean>([[errorColorText, hasError]]))}
						Text={helperText}
					/>
				)}
			</frame>
		</frame>
	);
}

export default Input;
