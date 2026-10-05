import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import {
	StackAlign,
	StackDirection,
	StackJustify,
	stackAlignKey,
	stackGap,
	stackIsRow,
	stackJustifyKey,
	stackNeedsMainFill,
	stackRootAutomaticSize,
	stackUsesFlex,
} from "./stackAlign";

function horizontalAlign(key: StackAlign | StackJustify): Enum.HorizontalAlignment {
	if (key === "center") return Enum.HorizontalAlignment.Center;
	if (key === "end") return Enum.HorizontalAlignment.Right;
	return Enum.HorizontalAlignment.Left;
}

function verticalAlign(key: StackAlign | StackJustify): Enum.VerticalAlignment {
	if (key === "center") return Enum.VerticalAlignment.Center;
	if (key === "end") return Enum.VerticalAlignment.Bottom;
	return Enum.VerticalAlignment.Top;
}

function mainFlex(justify: StackJustify): Enum.UIFlexAlignment {
	if (justify === "space-between") return Enum.UIFlexAlignment.SpaceBetween;
	if (justify === "space-around") return Enum.UIFlexAlignment.SpaceAround;
	if (justify === "space-evenly") return Enum.UIFlexAlignment.SpaceEvenly;
	return Enum.UIFlexAlignment.None;
}

function lineAlign(align: StackAlign): Enum.ItemLineAlignment {
	if (align === "center") return Enum.ItemLineAlignment.Center;
	if (align === "end") return Enum.ItemLineAlignment.End;
	if (align === "stretch") return Enum.ItemLineAlignment.Stretch;
	return Enum.ItemLineAlignment.Start;
}

function automaticSize(key: "XY" | "X" | "Y"): Enum.AutomaticSize {
	if (key === "X") return Enum.AutomaticSize.X;
	if (key === "Y") return Enum.AutomaticSize.Y;
	return Enum.AutomaticSize.XY;
}

const useStackStyles = componentStyles<{
	direction?: StackDirection;
	spacing?: number;
	gap?: number;
	wrap?: boolean;
	alignItems?: StackAlign;
	justifyContent?: StackJustify;
}>("Stack", (theme: Theme, { direction, spacing, gap, wrap, alignItems, justifyContent }) => {
	const row = stackIsRow(direction);
	const cross = stackAlignKey(alignItems);
	const main = stackJustifyKey(justifyContent);
	const flex = stackUsesFlex(main) ? mainFlex(main) : Enum.UIFlexAlignment.None;
	const fillMain = stackNeedsMainFill(wrap, main);
	const auto = stackRootAutomaticSize(row, fillMain);
	return createStyles({
		root: {
			AutomaticSize: automaticSize(auto),
			Size: fillMain
				? row
					? new UDim2(1, 0, 0, 0)
					: new UDim2(0, 0, 1, 0)
				: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: row ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.spacing.calc(stackGap(spacing, gap))),
			Wraps: wrap === true,
			ItemLineAlignment: lineAlign(cross),
			HorizontalAlignment: row ? horizontalAlign(main) : horizontalAlign(cross === "stretch" ? "start" : cross),
			VerticalAlignment: row ? verticalAlign(cross === "stretch" ? "start" : cross) : verticalAlign(main),
			HorizontalFlex: row ? flex : Enum.UIFlexAlignment.None,
			VerticalFlex: row ? Enum.UIFlexAlignment.None : flex,
		} as WriteableStyle<UIListLayout>,
	});
});

export default useStackStyles;
