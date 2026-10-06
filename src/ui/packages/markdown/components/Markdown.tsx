import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Divider } from "ui/packages/divider";
import { SxHost } from "ui/packages/host";
import { Orientations } from "ui/enums";
import { FontSizeVariant } from "theme/interfaces/typography";
import { inlinesToRichText, MdBlock, MdInline, parseMarkdown } from "../parseMarkdown";
import useMarkdownStyles from "./Markdown.styles";

export interface MarkdownProps {
	value?: string;
}

function headingVariant(level: number): FontSizeVariant {
	if (level <= 1) return "h1";
	if (level === 2) return "h2";
	if (level === 3) return "h3";
	if (level === 4) return "h4";
	if (level === 5) return "h5";
	return "h6";
}

function textSizeFor(variant?: FontSizeVariant): number {
	if (variant === "h1") return 28;
	if (variant === "h2") return 22;
	if (variant === "h3") return 18;
	if (variant === "h4") return 16;
	if (variant === "h5" || variant === "h6") return 14;
	return 14;
}

function richLabel(
	key: string,
	styles: ReturnType<typeof useMarkdownStyles>,
	inlines: MdInline[],
	variant?: FontSizeVariant,
	order?: number,
) {
	const text = inlinesToRichText(inlines);
	return (
		<textlabel
			key={key}
			{...styles.text}
			LayoutOrder={order}
			Text={text}
			TextSize={textSizeFor(variant)}
			Font={variant !== undefined && variant !== "body" ? Enum.Font.SourceSansBold : Enum.Font.SourceSans}
		/>
	);
}

function renderBlock(block: MdBlock, index: number, styles: ReturnType<typeof useMarkdownStyles>) {
	if (block.kind === "heading") {
		return (
			<frame key={`h-${index}`} {...styles.block} LayoutOrder={index}>
				{richLabel("Text", styles, block.inlines, headingVariant(block.level))}
			</frame>
		);
	}
	if (block.kind === "paragraph") {
		return (
			<frame key={`p-${index}`} {...styles.block} LayoutOrder={index}>
				{richLabel("Text", styles, block.inlines, "body")}
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
		return <Divider key={`hr-${index}`} orientation={Orientations.Horizontal} padding={0} className={{ LayoutOrder: index }} />;
	}
	if (block.kind === "blockquote") {
		return (
			<frame key={`q-${index}`} {...styles.quote} LayoutOrder={index}>
				<uicorner CornerRadius={new UDim(0, 4)} />
				<frame key="Bar" {...styles.quoteBar} />
				<uipadding {...styles.quotePad} />
				{richLabel("Text", styles, block.inlines, "body")}
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
							{richLabel("Text", styles, labeled, "body")}
						</frame>
					);
				})}
			</frame>
		);
	}
	return undefined;
}

function Markdown(props: CustomizedProps<Frame, MarkdownProps>) {
	const { value = "", className, sx, id, ref } = props;
	const styles = useMarkdownStyles();
	const blocks = parseMarkdown(value);
	return (
		<SxHost tag="frame" key={id || "Markdown"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.layout} />
			{blocks.map((block, index) => renderBlock(block, index, styles))}
		</SxHost>
	);
}

export default Markdown;
