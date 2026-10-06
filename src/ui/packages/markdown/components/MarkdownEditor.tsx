import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { Button } from "ui/packages/button";
import { SxHost } from "ui/packages/host";
import { IconButton } from "ui/packages/iconButton";
import { Icons } from "ui/enums";
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
	const [heightState, setHeightState] = useState(defaultHeight);
	const [dragging, setDragging] = useState(false);
	const focused = useRef(false);
	const dragStart = useRef(0);
	const heightStart = useRef(0);
	const mode = modeProp ?? modeState;
	const fullscreen = fullscreenProp ?? fullscreenState;
	const height = clampEditorHeight(heightProp ?? heightState, minHeight, maxHeight);
	const compact = theme.density === "compact";
	const styles = useMarkdownEditorStyles({ fullscreen, compact });

	useEffect(() => {
		if (!focused.current) setDraft(value);
	}, [value]);

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
						else setHtmlDraft("");
					}}
				/>
				<IconButton
					icon={Icons.Expanded}
					size="sm"
					tint={theme.palette.text.secondary}
					selected={fullscreen}
					onClick={() => setFullscreen(!fullscreen)}
					className={{ LayoutOrder: 99 }}
				/>
				</frame>
				{htmlDraft !== undefined && (
				<frame
					key="HtmlPaste"
					Size={new UDim2(1, 0, 0, 96)}
					BackgroundColor3={theme.palette.surface.elevated}
					BorderSizePixel={0}
					LayoutOrder={1}
				>
					<uipadding
						PaddingTop={new UDim(0, theme.padding.calc(1))}
						PaddingBottom={new UDim(0, theme.padding.calc(1))}
						PaddingLeft={new UDim(0, theme.padding.calc(1))}
						PaddingRight={new UDim(0, theme.padding.calc(1))}
					/>
					<uilistlayout
						FillDirection={Enum.FillDirection.Vertical}
						SortOrder={Enum.SortOrder.LayoutOrder}
						Padding={new UDim(0, theme.padding.calc(1))}
					/>
					<textbox
						key="HtmlField"
						Size={new UDim2(1, 0, 0, 48)}
						BackgroundColor3={theme.palette.surface.input}
						BorderSizePixel={0}
						ClearTextOnFocus={false}
						MultiLine={true}
						Text={htmlDraft}
						PlaceholderText="Paste HTML here"
						TextXAlignment={Enum.TextXAlignment.Left}
						TextYAlignment={Enum.TextYAlignment.Top}
						TextSize={theme.typography.fontSizes.caption}
						TextColor3={theme.palette.text.primary}
						Font={Enum.Font.RobotoMono}
						Change={{ Text: (rbx) => setHtmlDraft(rbx.Text) }}
						LayoutOrder={1}
					/>
					<frame key="HtmlActions" Size={new UDim2(1, 0, 0, 28)} BackgroundTransparency={1} LayoutOrder={2}>
						<uilistlayout
							FillDirection={Enum.FillDirection.Horizontal}
							Padding={new UDim(0, theme.padding.calc(1))}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>
						<Button
							text="Convert"
							size="small"
							className={{ LayoutOrder: 1, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
							onLeftClick={() => {
								onChange(htmlToMarkdown(htmlDraft));
								setHtmlDraft(undefined);
								setMode("preview");
							}}
						/>
						<Button
							text="Cancel"
							variant="text"
							size="small"
							className={{ LayoutOrder: 2, AutomaticSize: Enum.AutomaticSize.XY, Size: UDim2.fromScale(0, 0) }}
							onLeftClick={() => setHtmlDraft(undefined)}
						/>
					</frame>
				</frame>
				)}
				<frame key="Body" {...styles.body} LayoutOrder={3}>
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
