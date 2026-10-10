import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { CodeLanguage } from "ui/packages/markdown/parseMarkdown";
import { ChoiceOption } from "ui/packages/radioGroup";
import { Select } from "ui/packages/select";
import { SxHost } from "ui/packages/host";
import useCodeEditorStyles from "./CodeEditor.styles";

export interface CodeEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	language?: CodeLanguage;
	onLanguageChange?: (language: CodeLanguage) => void;
	readOnly?: boolean;
	placeholder?: string;
}

const LANGUAGES: ChoiceOption<CodeLanguage>[] = [
	{ label: "luau", value: "luau" },
	{ label: "ts", value: "ts" },
	{ label: "json", value: "json" },
	{ label: "text", value: "text" },
];

function CodeEditor(props: CustomizedProps<Frame, CodeEditorProps>) {
	const { value, onChange, language, onLanguageChange, readOnly = false, placeholder = "", className, sx, id, ref } = props;
	const { theme } = useTheme();
	const [draft, setDraft] = useState(value ?? "");
	const [picked, setPicked] = useState<CodeLanguage>(language ?? "text");
	const [focused, setFocused] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const shown = language ?? picked;
	const editable = readOnly !== true;
	const minHeight = editable ? theme.spacing.calc(8) : 0;
	const fieldHeight = math.max(minHeight, contentHeight);
	const styles = useCodeEditorStyles({ focused: focused && editable, fieldHeight });

	useEffect(() => setDraft(value ?? ""), [value]);

	return (
		<SxHost tag="frame" key={id || "CodeEditor"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ focused }}>
			<uistroke {...styles.stroke} />
			<uicorner {...styles.corner} />
			<uipadding {...styles.padding} />
			<uilistlayout {...styles.stack} />
			{editable && (
				<frame key="Bar" {...styles.bar}>
					<uilistlayout {...styles.barRow} />
					<Select
						value={shown}
						options={LANGUAGES}
						size="small"
						onChange={(choice) => {
							if (language === undefined) setPicked(choice);
							if (onLanguageChange) onLanguageChange(choice);
						}}
					/>
				</frame>
			)}
			<textbox
				key="Field"
				{...styles.field}
				Text={draft}
				PlaceholderText={placeholder}
				MultiLine={true}
				TextEditable={editable}
				Change={{
					Text: (rbx) => {
						if (!editable) return;
						setDraft(rbx.Text);
						if (onChange) onChange(rbx.Text);
					},
					TextBounds: (rbx) => setContentHeight(rbx.TextBounds.Y),
				}}
				Event={{
					Focused: () => {
						if (editable) setFocused(true);
					},
					FocusLost: () => setFocused(false),
				}}
			/>
		</SxHost>
	);
}

export default CodeEditor;
