import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { Divider } from "ui/packages/divider";
import { SxHost } from "ui/packages/host";
import { Link } from "ui/packages/link";
import { Orientations } from "ui/enums";
import { FontSizeOptions, FontSizeVariant } from "theme/interfaces/typography";
import { inlinePieces, inlinesToRichText, markdownLinkPayload, MarkdownLinkPayload, MdAlign, MdBlock, MdInline, parseMarkdown } from "../parseMarkdown";
import useMarkdownStyles from "./Markdown.styles";

export interface MarkdownProps {
	value?: string;
	onLink?: (payload: MarkdownLinkPayload) => void;
}

function headingVariant(level: number): FontSizeVariant {
	if (level <= 1) return "h1";
	if (level === 2) return "h2";
	if (level === 3) return "h3";
	if (level === 4) return "h4";
	if (level === 5) return "h5";
	return "h6";
}

function textSizeFor(sizes: FontSizeOptions, variant?: FontSizeVariant) {
	if (variant === "h1") return sizes.h1;
	if (variant === "h2") return sizes.h2;
	if (variant === "h3") return sizes.h3;
	if (variant === "h4") return sizes.h4;
	if (variant === "h5") return sizes.h5;
	if (variant === "h6") return sizes.h6;
	return sizes.body;
}

function richLabel(
	key: string,
	styles: ReturnType<typeof useMarkdownStyles>,
	inlines: MdInline[],
	variant?: FontSizeVariant,
	order?: number,
	size?: UDim2,
	sizes?: FontSizeOptions,
) {
	const text = inlinesToRichText(inlines);
	return (
		<textlabel
			key={key}
			{...styles.text}
			{...(size !== undefined ? { Size: size } : {})}
			LayoutOrder={order}
			Text={text}
			TextSize={textSizeFor(sizes ?? {}, variant)}
			Font={variant !== undefined && variant !== "body" ? Enum.Font.SourceSansBold : Enum.Font.SourceSans}
		/>
	);
}

function inlineHasLink(inlines: MdInline[]) {
	for (const part of inlines) {
		if (markdownLinkPayload(part) !== undefined) return true;
	}
	return false;
}

function inlineFlow(
	key: string,
	styles: ReturnType<typeof useMarkdownStyles>,
	inlines: MdInline[],
	variant: FontSizeVariant | undefined,
	order: number | undefined,
	onLink?: (payload: MarkdownLinkPayload) => void,
	sizes?: FontSizeOptions,
	flow = styles.flow,
) {
	if (!inlineHasLink(inlines)) {
		const span = flow !== styles.flow ? (flow as unknown as { Size: UDim2 }).Size : undefined;
		return richLabel(key, styles, inlines, variant, order, span, sizes);
	}
	const pieces = inlinePieces(inlines);
	const textSize = textSizeFor(sizes ?? {}, variant);
	const font = variant !== undefined && variant !== "body" ? Enum.Font.SourceSansBold : Enum.Font.SourceSans;
	return (
		<frame key={key} {...flow} LayoutOrder={order}>
			<uilistlayout {...styles.flowLayout} />
			{pieces.map((piece, index) => {
				if (piece.kind === "break") {
					return (
						<frame
							key={`br-${index}`}
							LayoutOrder={index}
							Size={new UDim2(1, 0, 0, 0)}
							BackgroundTransparency={1}
							BorderSizePixel={0}
						/>
					);
				}
				if (piece.kind === "link") {
					const payload = markdownLinkPayload({ kind: "link", text: piece.text, href: piece.href });
					if (payload === undefined) return undefined;
					return (
						<Link
							key={`ln-${index}`}
							text={payload.text}
							color="primary"
							sx={{ TextSize: textSize, Font: font, LayoutOrder: index }}
							onActivated={() => onLink?.(payload)}
						/>
					);
				}
				return (
					<textlabel
						key={`wd-${index}`}
						{...styles.word}
						LayoutOrder={index}
						Text={piece.text}
						TextSize={textSize}
						Font={font}
					/>
				);
			})}
		</frame>
	);
}

function renderBlock(
	block: MdBlock,
	index: number,
	styles: ReturnType<typeof useMarkdownStyles>,
	sizes: FontSizeOptions,
	onLink?: (payload: MarkdownLinkPayload) => void,
) {
	if (block.kind === "heading") {
		return (
			<frame key={`h-${index}`} {...styles.block} LayoutOrder={index}>
				{inlineFlow("Text", styles, block.inlines, headingVariant(block.level), undefined, onLink, sizes)}
			</frame>
		);
	}
	if (block.kind === "paragraph") {
		return (
			<frame key={`p-${index}`} {...styles.block} LayoutOrder={index}>
				{inlineFlow("Text", styles, block.inlines, "body", undefined, onLink, sizes)}
			</frame>
		);
	}
	if (block.kind === "code") {
		return (
			<frame key={`c-${index}`} {...styles.code} LayoutOrder={index}>
				<uicorner CornerRadius={new UDim(0, 4)} />
				<uipadding {...styles.codePad} />
				<textlabel key="Code" {...styles.codeText} Text={block.text} />
			</frame>
		);
	}
	if (block.kind === "hr") {
		return (
			<Divider
				key={`hr-${index}`}
				orientation={Orientations.Horizontal}
				padding={0}
				className={{ LayoutOrder: index, Size: (styles.block as unknown as { Size: UDim2 }).Size }}
			/>
		);
	}
	if (block.kind === "blockquote") {
		return (
			<frame key={`q-${index}`} {...styles.quote} LayoutOrder={index}>
				<uicorner CornerRadius={new UDim(0, 4)} />
				<uipadding {...styles.quoteBarPad} />
				<frame key="Face" {...styles.quoteFace}>
					<uicorner CornerRadius={new UDim(0, 3)} />
					<uipadding {...styles.quotePad} />
					<uilistlayout {...styles.quoteStack} />
					{block.paragraphs.map((inlines, para) =>
						inlineFlow(`p-${para}`, styles, inlines, "body", para, onLink, sizes, styles.quoteFlow),
					)}
				</frame>
			</frame>
		);
	}
	if (block.kind === "table") {
		const alignOf = (align: MdAlign) => {
			if (align === "center") return Enum.TextXAlignment.Center;
			if (align === "right") return Enum.TextXAlignment.Right;
			return Enum.TextXAlignment.Left;
		};
		const lines = [block.header, ...block.rows];
		return (
			<frame key={`t-${index}`} {...styles.tableScroll} LayoutOrder={index}>
				<frame key="Grid" {...styles.tableGrid}>
					<uilistlayout FillDirection={Enum.FillDirection.Vertical} SortOrder={Enum.SortOrder.LayoutOrder} />
					{lines.map((row, rowIndex) => (
						<frame
							key={`tr-${rowIndex}`}
							{...styles.tableRow}
							{...(rowIndex === 0 ? styles.tableHead : {})}
							LayoutOrder={rowIndex}
						>
							<uistroke {...styles.tableStroke} />
							<uilistlayout
								FillDirection={Enum.FillDirection.Horizontal}
								VerticalAlignment={Enum.VerticalAlignment.Center}
								SortOrder={Enum.SortOrder.LayoutOrder}
							/>
							{row.map((cell, col) => (
								<textlabel
									key={`td-${col}`}
									{...styles.tableCell}
									{...(rowIndex === 0 ? styles.tableHeadText : {})}
									LayoutOrder={col}
									Text={inlinesToRichText(cell)}
									TextXAlignment={alignOf(block.align[col] ?? "left")}
								>
									<uipadding {...styles.tableCellPad} />
								</textlabel>
							))}
						</frame>
					))}
				</frame>
			</frame>
		);
	}
	if (block.kind === "list") {
		return (
			<frame key={`l-${index}`} {...styles.block} LayoutOrder={index}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 2)}
				/>
				{block.items.map((item, itemIndex) => {
					const prefix = block.ordered ? `${itemIndex + 1}. ` : "• ";
					const labeled: MdInline[] = [{ kind: "text", text: prefix }, ...item];
					return (
						<frame key={`li-${itemIndex}`} {...styles.listItem} LayoutOrder={itemIndex}>
							{inlineFlow("Text", styles, labeled, "body", undefined, onLink, sizes)}
						</frame>
					);
				})}
			</frame>
		);
	}
	return undefined;
}

function Markdown(props: CustomizedProps<Frame, MarkdownProps>) {
	const { value = "", onLink, className, sx, id, ref } = props;
	const styles = useMarkdownStyles();
	const { theme } = useTheme();
	const blocks = parseMarkdown(value);
	return (
		<SxHost tag="frame" key={id || "Markdown"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uipadding {...styles.inset} />
			<uilistlayout {...styles.layout} />
			{blocks.map((block, index) => renderBlock(block, index, styles, theme.typography.fontSizes, onLink))}
		</SxHost>
	);
}

export default Markdown;
