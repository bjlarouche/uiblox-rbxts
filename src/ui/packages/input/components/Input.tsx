import React, { useEffect, useRef, useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { Divider } from "../../divider";
import { Orientations } from "ui/enums";
import { InputColor, InputMargin, InputVariant } from "../types";
import useInputStyles from "./Input.styles";
import { syncInputDraft } from "./inputDraft";

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
	onInput?: (text: string) => void;
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
		onInput,
		onFocus,
		onBlur,
		onEnterPressed,
		className,
		id,
		ref
	} = props;

	const { root, font, margin, box, helper, errorColorFrame, errorColorText, divider, corner, stroke } =
		useInputStyles(props);
	const focused = useRef(false);
	const entered = useRef(false);
	const [draft, setDraft] = useState(text ?? "");

	useEffect(() => {
		setDraft((current) => syncInputDraft(focused.current, text, current));
	}, [text]);

	return (
		<frame key={id || "Input"} ref={ref} {...root} {...className}>
			<frame key="Margin" {...margin}>
				<textbox
					key={"Field"}
					{...font}
					{...box}
					Active={!disabled}
					Text={draft}
					PlaceholderText={placeholder}
					{...cx(hasError && errorColorText)}
					Change={{
						Text: (rbx) => {
							setDraft(rbx.Text);
							if (focused.current && onInput) onInput(rbx.Text);
						},
					}}
					Event={{
						Focused: () => {
							focused.current = true;
							entered.current = false;
							if (onFocus) onFocus();
						},
						ReturnPressedFromOnScreenKeyboard: (rbx) => {
							if (entered.current || !onEnterPressed) return;
							entered.current = true;
							onEnterPressed(rbx.Text);
						},
						FocusLost: (rbx, enterPressed) => {
							focused.current = false;
							const committed = rbx.Text;
							if (onTextChanged) onTextChanged(committed);
							if (enterPressed && !entered.current && onEnterPressed) onEnterPressed(committed);
							entered.current = false;
							if (onBlur) onBlur();
							setDraft(text ?? "");
						},
					}}
				>
					{variant === "outlined" && <uistroke {...stroke} />}
					{rounded && <uicorner {...corner} />}
				</textbox>
				<Divider
					padding={0}
					orientation={Orientations.Horizontal}
					className={cx(divider, hasError && errorColorFrame)}
				/>
				{helperText !== undefined && (
					<textlabel
						key={"HelperText"}
						{...font}
						{...helper}
						{...cx(hasError && errorColorText)}
						Text={helperText}
					/>
				)}
			</frame>
		</frame>
	);
}

export default Input;
