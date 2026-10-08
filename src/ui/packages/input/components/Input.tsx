import React, { useEffect, useRef, useState } from "@rbxts/react";
import { ControlSize, cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { spinnerPixels } from "ui/packages/button/components/buttonLook";
import { CircularProgress } from "ui/packages/circularProgress";
import { Divider } from "ui/packages/divider";
import { SxHost } from "ui/packages/host";
import { Orientations } from "ui/enums";
import { InputColor, InputMargin, InputVariant } from "../types";
import useInputStyles from "./Input.styles";
import { clampText } from "./clampText";
import { syncInputDraft } from "./inputDraft";

export type DefaultInputComponent = Frame;

export interface InputProps {
	color?: InputColor;
	disabled?: boolean;
	readOnly?: boolean;
	loading?: boolean;
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
	multiline?: boolean;
	minRows?: number;
	maxRows?: number;
	maxLength?: number;
	reducedMotion?: boolean;
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
		readOnly = false,
		loading = false,
		hasError = false,
		rounded = true,
		size,
		multiline = false,
		maxLength,
		reducedMotion,
		startAdornment,
		endAdornment,
		onTextChanged,
		onInput,
		onFocus,
		onBlur,
		onEnterPressed,
		className,
		sx,
		id,
		ref,
	} = props;

	const focusedRef = useRef(false);
	const entered = useRef(false);
	const [draft, setDraft] = useState(text ?? "");
	const [focused, setFocused] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const { theme } = useTheme();
	const active = canActivate(disabled, loading);
	const editable = active && readOnly !== true;
	const endSlotContent = loading ? undefined : endAdornment;

	const { root, font, margin, shell, box, startSlot, endSlot, helper, errorColorFrame, errorColorText, divider, corner, stroke } =
		useInputStyles({ ...props, focused, contentHeight });

	useEffect(() => {
		setDraft((current) => clampText(syncInputDraft(focusedRef.current, text, current), maxLength));
	}, [text, maxLength]);

	const showStroke = variant === "outlined" || variant === "filled";
	const showCorner = rounded;

	return (
		<SxHost tag="frame" key={id || "Input"} hostRef={ref} base={root} className={className} sx={sx} state={{ disabled, loading, focused }}>
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
						Active={active}
						TextEditable={editable}
						Text={draft}
						PlaceholderText={placeholder}
						MultiLine={multiline}
						{...cx(hasError && errorColorText)}
						Change={{
							Text: (rbx) => {
								if (!editable) return;
								const capped = clampText(rbx.Text, maxLength);
								if (rbx.Text !== capped) {
									rbx.Text = capped;
									return;
								}
								setDraft(capped);
								if (focusedRef.current && onInput) onInput(capped);
							},
							TextBounds: (rbx) => {
								if (multiline) setContentHeight(rbx.TextBounds.Y);
							},
						}}
						Event={{
							Focused: () => {
								if (!editable) return;
								focusedRef.current = true;
								entered.current = false;
								setFocused(true);
								if (onFocus) onFocus();
							},
							ReturnPressedFromOnScreenKeyboard: (rbx) => {
								if (!editable || multiline || entered.current || !onEnterPressed) return;
								entered.current = true;
								onEnterPressed(clampText(rbx.Text, maxLength));
							},
							FocusLost: (rbx, enterPressed) => {
								focusedRef.current = false;
								setFocused(false);
								const committed = clampText(rbx.Text, maxLength);
								if (editable && onTextChanged) onTextChanged(committed);
								if (editable && !multiline && enterPressed && !entered.current && onEnterPressed) onEnterPressed(committed);
								entered.current = false;
								if (onBlur) onBlur();
								setDraft(clampText(text ?? "", maxLength));
							},
						}}
					/>
					{loading && (
						<frame key="End" {...endSlot}>
							{adornmentAlign()}
							<CircularProgress
								size={spinnerPixels(size)}
								thickness={2}
								color={theme.palette.text.secondary}
								reducedMotion={reducedMotion}
							/>
						</frame>
					)}
					{endSlotContent !== undefined && (
						<frame key="End" {...endSlot}>
							{adornmentAlign()}
							{endSlotContent}
						</frame>
					)}
				</frame>
				{variant === "standard" && (
					<Divider
						padding={0}
						weight={focused ? 2 : undefined}
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
		</SxHost>
	);
}

export default Input;
