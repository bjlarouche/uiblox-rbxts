import React, { useEffect, useRef, useState } from "@rbxts/react";
import { ControlSize, cx, CustomizedProps } from "theme";
import { Divider } from "ui/packages/divider";
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
	size?: ControlSize;
	startAdornment?: React.Element;
	endAdornment?: React.Element;
	onTextChanged?: (text: string) => void;
	onInput?: (text: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onEnterPressed?: (text: string) => void;
}

function adornmentAlign() {
	return (
		<uilistlayout
			FillDirection={Enum.FillDirection.Horizontal}
			HorizontalAlignment={Enum.HorizontalAlignment.Center}
			VerticalAlignment={Enum.VerticalAlignment.Center}
			SortOrder={Enum.SortOrder.LayoutOrder}
		/>
	);
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
		startAdornment,
		endAdornment,
		onTextChanged,
		onInput,
		onFocus,
		onBlur,
		onEnterPressed,
		className,
		id,
		ref,
	} = props;

	const focusedRef = useRef(false);
	const entered = useRef(false);
	const [draft, setDraft] = useState(text ?? "");
	const [focused, setFocused] = useState(false);

	const { root, font, margin, shell, box, startSlot, endSlot, helper, errorColorFrame, errorColorText, divider, corner, stroke } =
		useInputStyles({ ...props, focused });

	useEffect(() => {
		setDraft((current) => syncInputDraft(focusedRef.current, text, current));
	}, [text]);

	const showStroke = variant === "outlined" || variant === "filled";
	const showCorner = rounded;

	return (
		<frame key={id || "Input"} ref={ref} {...root} {...className}>
			<frame key="Margin" {...margin}>
				<frame key="Shell" {...shell}>
					{showStroke && <uistroke {...stroke} />}
					{showCorner && <uicorner {...corner} />}
					{startAdornment !== undefined && (
						<frame key="Start" {...startSlot}>
							{adornmentAlign()}
							{startAdornment}
						</frame>
					)}
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
								if (focusedRef.current && onInput) onInput(rbx.Text);
							},
						}}
						Event={{
							Focused: () => {
								focusedRef.current = true;
								entered.current = false;
								setFocused(true);
								if (onFocus) onFocus();
							},
							ReturnPressedFromOnScreenKeyboard: (rbx) => {
								if (entered.current || !onEnterPressed) return;
								entered.current = true;
								onEnterPressed(rbx.Text);
							},
							FocusLost: (rbx, enterPressed) => {
								focusedRef.current = false;
								setFocused(false);
								const committed = rbx.Text;
								if (onTextChanged) onTextChanged(committed);
								if (enterPressed && !entered.current && onEnterPressed) onEnterPressed(committed);
								entered.current = false;
								if (onBlur) onBlur();
								setDraft(text ?? "");
							},
						}}
					/>
					{endAdornment !== undefined && (
						<frame key="End" {...endSlot}>
							{adornmentAlign()}
							{endAdornment}
						</frame>
					)}
				</frame>
				{variant === "standard" && (
					<Divider
						padding={0}
						orientation={Orientations.Horizontal}
						className={cx(divider, hasError && errorColorFrame)}
					/>
				)}
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
