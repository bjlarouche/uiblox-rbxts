import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import {
	StackAlign,
	StackDirection,
	StackJustify,
	stackAlignKey,
	stackGap,
	stackIsRow,
	stackJustifyKey,
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

const useStackStyles = componentStyles<{
	direction?: StackDirection;
	spacing?: number;
	alignItems?: StackAlign;
	justifyContent?: StackJustify;
}>("Stack", (theme: Theme, { direction, spacing, alignItems, justifyContent }) => {
	const row = stackIsRow(direction);
	const cross = stackAlignKey(alignItems);
	const main = stackJustifyKey(justifyContent);
	const flex = stackUsesFlex(main) ? mainFlex(main) : Enum.UIFlexAlignment.None;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: row ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.spacing.calc(stackGap(spacing))),
			HorizontalAlignment: row ? horizontalAlign(main) : horizontalAlign(cross),
			VerticalAlignment: row ? verticalAlign(cross) : verticalAlign(main),
			HorizontalFlex: row ? flex : Enum.UIFlexAlignment.None,
			VerticalFlex: row ? Enum.UIFlexAlignment.None : flex,
		} as WriteableStyle<UIListLayout>,
	});
});

export default useStackStyles;
