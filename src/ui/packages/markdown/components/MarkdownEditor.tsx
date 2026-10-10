import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { Button } from "ui/packages/button";
import { SxHost } from "ui/packages/host";
import { Icons } from "ui/enums";
import { Input } from "ui/packages/input";
import { ToggleButtonGroup } from "ui/packages/toggleButton";
import { htmlToMarkdown } from "../htmlToMarkdown";
import Markdown from "./Markdown";
import { clampEditorHeight } from "./markdownEditorHeight";
import useMarkdownEditorStyles, { MarkdownEditorMode } from "./MarkdownEditor.styles";

export interface MarkdownEditorProps {
	value: string;
	onChange: (value: string) => void;
	mode?: MarkdownEditorMode;
	onModeChange?: (mode: MarkdownEditorMode) => void;
	fullscreen?: boolean;
	onFullscreenChange?: (fullscreen: boolean) => void;
	preview?: (value: string) => React.Element;
	placeholder?: string;
	resizable?: boolean;
	height?: number;
	defaultHeight?: number;
	minHeight?: number;
	maxHeight?: number;
	onHeightChange?: (height: number) => void;
}

const MODE_OPTIONS = [
	{ label: "Split", value: "split" as const },
	{ label: "Edit", value: "edit" as const },
	{ label: "Preview", value: "preview" as const },
];

function isBlank(value: string): boolean {
	for (let i = 1; i <= value.size(); i++) {
		const ch = value.sub(i, i);
		if (ch !== " " && ch !== "\t" && ch !== "\n" && ch !== "\r") return false;
	}
	return true;
}

function looksLikeHtml(text: string): boolean {
	const lower = text.lower();
	return (
		lower.find("<p", 1, true)[0] !== undefined ||
		lower.find("<h1", 1, true)[0] !== undefined ||
		lower.find("<h2", 1, true)[0] !== undefined ||
		lower.find("<div", 1, true)[0] !== undefined ||
		lower.find("<ul", 1, true)[0] !== undefined ||
		lower.find("<ol", 1, true)[0] !== undefined ||
		lower.find("<pre", 1, true)[0] !== undefined ||
		lower.find("<blockquote", 1, true)[0] !== undefined ||
		lower.find("<strong", 1, true)[0] !== undefined
	);
}

function MarkdownEditor(props: CustomizedProps<Frame, MarkdownEditorProps>) {
	const {
		value,
		onChange,
		mode: modeProp,
		onModeChange,
		fullscreen: fullscreenProp,
		onFullscreenChange,
		preview,
		placeholder = "Write markdown…",
		resizable = false,
		height: heightProp,
		defaultHeight = 360,
		minHeight = 200,
		maxHeight = 720,
		onHeightChange,
		className,
		sx,
		id,
		ref,
	} = props;
	const { theme } = useTheme();
	const [modeState, setModeState] = useState<MarkdownEditorMode>("split");
	const [fullscreenState, setFullscreenState] = useState(false);
	const [draft, setDraft] = useState(value);
	const [htmlDraft, setHtmlDraft] = useState<string | undefined>(undefined);
	const [htmlError, setHtmlError] = useState<string | undefined>(undefined);
	const [panelHeight, setPanelHeight] = useState(0);
	const [heightState, setHeightState] = useState(defaultHeight);
	const [dragging, setDragging] = useState(false);
	const focused = useRef(false);
	const dragStart = useRef(0);
	const heightStart = useRef(0);
	const mode = modeProp ?? modeState;
	const fullscreen = fullscreenProp ?? fullscreenState;
	const height = clampEditorHeight(heightProp ?? heightState, minHeight, maxHeight);
	const compact = theme.density === "compact";
	const toolbarHeight = compact ? 32 : 36;
	const gripped = resizable === true && fullscreen !== true;
	const styles = useMarkdownEditorStyles({ fullscreen, compact, gripped });

	useEffect(() => {
		if (!focused.current) setDraft(value);
	}, [value]);
	useEffect(() => {
		if (htmlDraft === undefined) setPanelHeight(0);
	}, [htmlDraft]);

	const setMode = (modeNext: MarkdownEditorMode) => {
		if (modeProp === undefined) setModeState(modeNext);
		onModeChange?.(modeNext);
	};
	const setFullscreen = (fullNext: boolean) => {
		if (fullscreenProp === undefined) setFullscreenState(fullNext);
		onFullscreenChange?.(fullNext);
	};
	const setHeight = (requested: number) => {
		const clamped = clampEditorHeight(requested, minHeight, maxHeight);
		if (heightProp === undefined) setHeightState(clamped);
		if (clamped !== height) onHeightChange?.(clamped);
	};

	const showEdit = mode === "split" || mode === "edit";
	const showPreview = mode === "split" || mode === "preview";
	const previewNode = preview !== undefined ? preview(value) : <Markdown value={value} />;

	return (
		<SxHost
			tag="frame"
			key={id || "MarkdownEditor"}
			hostRef={ref}
			base={{ ...styles.root, Size: resizable && !fullscreen ? new UDim2(1, 0, 0, height) : UDim2.fromScale(1, 1) }}
			className={className}
			sx={sx}
		>
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
			<frame key="Content" {...styles.content}>
				<uilistlayout {...styles.layout} />
				<frame key="Toolbar" {...styles.toolbar}>
				<uipadding {...styles.toolbarPad} />
				<uilistlayout {...styles.toolbarRow} />
				<ToggleButtonGroup
					value={mode}
					options={MODE_OPTIONS}
					size={compact ? "small" : "medium"}
					onChange={setMode}
					className={{ LayoutOrder: 1, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
				/>
				<Button
					text="Paste HTML"
					variant="text"
					size={compact ? "small" : "medium"}
					className={{ LayoutOrder: 2, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
					onLeftClick={() => {
						if (looksLikeHtml(value)) onChange(htmlToMarkdown(value));
						else {
							setHtmlError(undefined);
							setHtmlDraft("");
						}
					}}
				/>
				<imagebutton key="Fullscreen" {...styles.toolbarIcon} Event={{ Activated: () => setFullscreen(!fullscreen) }}>
					<imagelabel key="Glyph" {...styles.toolbarGlyph} Image={tostring(Icons.Expanded)} />
				</imagebutton>
				</frame>
				{htmlDraft !== undefined && (
				<frame
					key="HtmlPaste"
					{...styles.htmlWrap}
					Change={{ AbsoluteSize: (rbx) => setPanelHeight(rbx.AbsoluteSize.Y) }}
				>
					<uipadding {...styles.htmlGap} />
					<frame key="Surface" {...styles.htmlSurface}>
						<uistroke {...styles.htmlStroke} />
						<uicorner {...styles.htmlCorner} />
						<uipadding {...styles.htmlPad} />
						<uilistlayout {...styles.htmlStack} />
						<textlabel key="Hint" {...styles.htmlHint} Text="Paste HTML to convert to markdown" />
						<Input
							text={htmlDraft}
							placeholder="Paste HTML here"
							multiline
							minRows={4}
							variant="outlined"
							width={new UDim(1, 0)}
							hasError={htmlError !== undefined}
							helperText={htmlError}
							className={{ LayoutOrder: 2 }}
							onInput={(text) => {
								setHtmlDraft(text);
								setHtmlError(undefined);
							}}
							onTextChanged={(text) => setHtmlDraft(text)}
						/>
						<frame key="HtmlActions" {...styles.htmlActions}>
							<uilistlayout {...styles.htmlActionsRow} />
							<Button
								text="Convert"
								size={compact ? "small" : "medium"}
								disabled={isBlank(htmlDraft)}
								className={{ LayoutOrder: 1, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
								onLeftClick={() => {
									const converted = htmlToMarkdown(htmlDraft);
									if (isBlank(converted)) {
										setHtmlError("Couldn't convert that HTML");
										return;
									}
									onChange(converted);
									setHtmlError(undefined);
									setHtmlDraft(undefined);
									setMode("preview");
								}}
							/>
							<Button
								text="Cancel"
								variant="text"
								size={compact ? "small" : "medium"}
								className={{ LayoutOrder: 2, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
								onLeftClick={() => {
									setHtmlError(undefined);
									setHtmlDraft(undefined);
								}}
							/>
						</frame>
					</frame>
				</frame>
				)}
				<frame key="Body" {...styles.body} Size={new UDim2(1, 0, 1, -(toolbarHeight + panelHeight))} LayoutOrder={3}>
				{mode === "split" && <uilistlayout {...styles.split} />}
				{showEdit && (
					<frame key="EditPane" {...(mode === "split" ? styles.pane : styles.paneFull)} LayoutOrder={1}>
						<textbox
							key="Editor"
							{...styles.editor}
							Text={draft}
							PlaceholderText={placeholder}
							Change={{
								Text: (rbx) => {
									setDraft(rbx.Text);
									if (focused.current && rbx.Text !== value) onChange(rbx.Text);
								},
							}}
							Event={{
								Focused: () => {
									focused.current = true;
								},
								FocusLost: (rbx) => {
									focused.current = false;
									setDraft(rbx.Text);
									onChange(rbx.Text);
								},
							}}
						>
							<uipadding {...styles.editorPad} />
						</textbox>
					</frame>
				)}
				{mode === "split" && <frame key="SplitRule" {...styles.divider} />}
				{showPreview && (
					<scrollingframe
						key="PreviewPane"
						{...styles.previewScroll}
						Size={mode === "split" ? UDim2.fromScale(0.5, 1) : UDim2.fromScale(1, 1)}
						LayoutOrder={3}
					>
						<uipadding {...styles.previewPad} />
						{previewNode}
					</scrollingframe>
				)}
				</frame>
			</frame>
			{resizable && !fullscreen && (
				<textbutton
					key="ResizeGrip"
					{...styles.resizeGrip}
					Text=""
					Active={true}
					Selectable={true}
					Event={{
						InputBegan: (_, input) => {
							if (
								input.UserInputType === Enum.UserInputType.MouseButton1 ||
								input.UserInputType === Enum.UserInputType.Touch
							) {
								dragStart.current = input.Position.Y;
								heightStart.current = height;
								setDragging(true);
							} else if (input.KeyCode === Enum.KeyCode.Up) setHeight(height - 16);
							else if (input.KeyCode === Enum.KeyCode.Down) setHeight(height + 16);
						},
					}}
				>
					<frame key="Long" {...styles.resizeMark} Position={UDim2.fromOffset(4, 14)} Size={UDim2.fromOffset(12, 2)} />
					<frame key="Short" {...styles.resizeMark} Position={UDim2.fromOffset(10, 10)} Size={UDim2.fromOffset(6, 2)} />
				</textbutton>
			)}
			{dragging && (
				<frame
					key="ResizeOverlay"
					{...styles.resizeOverlay}
					Event={{
						InputChanged: (_, input) => {
							if (
								input.UserInputType === Enum.UserInputType.MouseMovement ||
								input.UserInputType === Enum.UserInputType.Touch
							) {
								setHeight(heightStart.current + input.Position.Y - dragStart.current);
							}
						},
						InputEnded: (_, input) => {
							if (
								input.UserInputType === Enum.UserInputType.MouseButton1 ||
								input.UserInputType === Enum.UserInputType.Touch
							) {
								setDragging(false);
							}
						},
						MouseLeave: () => setDragging(false),
					}}
				/>
			)}
		</SxHost>
	);
}

export default MarkdownEditor;
export type { MarkdownEditorMode };
