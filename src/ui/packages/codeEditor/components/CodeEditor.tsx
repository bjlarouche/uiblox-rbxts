import React, { useEffect, useState } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { controlMetrics, CustomizedProps, useTheme } from "theme";
import { CodeLanguage } from "ui/packages/markdown/parseMarkdown";
import { Icons } from "ui/enums";
import { Menu } from "ui/packages/menu";
import { SxHost } from "ui/packages/host";
import { CodeColors, colorHex, highlightCode } from "../highlightCode";
import useCodeEditorStyles from "./CodeEditor.styles";

export interface CodeEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	language?: CodeLanguage;
	onLanguageChange?: (language: CodeLanguage) => void;
	readOnly?: boolean;
	placeholder?: string;
}

const LANGUAGES: CodeLanguage[] = ["luau", "ts", "json", "text"];

function CodeEditor(props: CustomizedProps<Frame, CodeEditorProps>) {
	const { value, onChange, language, onLanguageChange, readOnly = false, placeholder = "", className, sx, id, ref } = props;
	const { theme } = useTheme();
	const [draft, setDraft] = useState(value ?? "");
	const [picked, setPicked] = useState<CodeLanguage>(language ?? "text");
	const [focused, setFocused] = useState(false);
	const [open, setOpen] = useState(false);
	const [anchor, setAnchor] = useState<TextButton>();
	const [boxHeight, setBoxHeight] = useState(0);
	const [inkHeight, setInkHeight] = useState(0);
	const shown = language ?? picked;
	const editable = readOnly !== true;
	// TextBox has TextTransparency and no separate caret property, so a transparent field hides the caret.
	const colored = !editable || !focused;
	const contentHeight = colored ? math.max(boxHeight, inkHeight) : boxHeight;
	const minHeight = editable ? theme.spacing.calc(8) : 0;
	const fieldHeight = math.max(minHeight, contentHeight);
	const metrics = controlMetrics(theme.density, "small");
	const mark = theme.typography.fontSizes.caption ?? metrics.font;
	const pad = theme.padding.calc(1);
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textWidth = TextService.GetTextSize(shown, metrics.font, font, new Vector2(10000, 100)).X;
	const triggerWidth = pad + textWidth + pad + mark + pad;
	const styles = useCodeEditorStyles({ focused: focused && editable, fieldHeight, triggerWidth });
	const colors: CodeColors = {
		keyword: colorHex(theme.palette.code.keyword),
		string: colorHex(theme.palette.code.string),
		number: colorHex(theme.palette.code.number),
		comment: colorHex(theme.palette.code.comment),
		func: colorHex(theme.palette.code.func),
	};
	const highlighted = highlightCode(draft, shown, colors);
	const empty = draft.size() === 0;

	useEffect(() => setDraft(value ?? ""), [value]);

	const pick = (choice: CodeLanguage) => {
		setOpen(false);
		if (language === undefined) setPicked(choice);
		if (onLanguageChange) onLanguageChange(choice);
	};

	return (
		<SxHost tag="frame" key={id || "CodeEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ focused }}>
			<uistroke {...styles.stroke} />
			<uicorner {...styles.corner} />
			<uipadding {...styles.padding} />
			<uilistlayout {...styles.stack} />
			{editable && (
				<frame key="Bar" {...styles.bar}>
					<uilistlayout {...styles.barRow} />
					<textbutton
						key="Language"
						ref={setAnchor}
						{...styles.trigger}
						Text={shown}
						Event={{
							Activated: () => setOpen((current) => !current),
						}}
					>
						<uipadding PaddingLeft={new UDim(0, pad)} PaddingRight={new UDim(0, pad + mark + pad)} />
						<uicorner {...styles.corner} />
						<uistroke {...styles.triggerStroke} />
						<imagelabel
							key="Caret"
							BackgroundTransparency={1}
							BorderSizePixel={0}
							AnchorPoint={new Vector2(1, 0.5)}
							Position={new UDim2(1, mark + pad, 0.5, 0)}
							Size={UDim2.fromOffset(mark, mark)}
							Image={Icons.Collapsed}
							Rotation={90}
							ImageColor3={theme.palette.text.secondary}
							ScaleType={Enum.ScaleType.Fit}
						/>
					</textbutton>
					<Menu
						anchor={anchor}
						open={open}
						dense
						selected={shown}
						items={LANGUAGES.map((choice) => ({ id: choice, text: choice }))}
						onSelect={(choice) => pick(choice as CodeLanguage)}
						onClose={() => setOpen(false)}
					/>
				</frame>
			)}
			<frame key="Field" {...styles.fieldHost}>
				<textlabel
					key="Ink"
					{...styles.highlight}
					Visible={colored}
					Active={false}
					Selectable={false}
					RichText={!empty}
					Text={empty ? placeholder : highlighted}
					TextColor3={empty ? theme.palette.text.secondary : theme.palette.text.primary}
					Change={{
						TextBounds: (rbx) => setInkHeight(rbx.TextBounds.Y),
					}}
				/>
				<textbox
					key="Input"
					{...styles.field}
					Text={draft}
					PlaceholderText={colored ? "" : placeholder}
					TextTransparency={colored ? 1 : 0}
					MultiLine={true}
					TextEditable={editable}
					Change={{
						Text: (rbx) => {
							if (!editable) return;
							setDraft(rbx.Text);
							if (onChange) onChange(rbx.Text);
						},
						TextBounds: (rbx) => setBoxHeight(rbx.TextBounds.Y),
					}}
					Event={{
						Focused: () => {
							if (editable) setFocused(true);
						},
						FocusLost: () => setFocused(false),
					}}
				/>
			</frame>
		</SxHost>
	);
}

export default CodeEditor;
