import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import {
	FlexItemAlign,
	flexItemAlignKey,
	flexItemGrowRatio,
	flexItemMode,
	flexItemShrinkRatio,
	FlexItemModeName,
} from "./flexItemMode";

function modeEnum(mode: FlexItemModeName): Enum.UIFlexMode {
	if (mode === "grow") return Enum.UIFlexMode.Grow;
	if (mode === "shrink") return Enum.UIFlexMode.Shrink;
	if (mode === "fill") return Enum.UIFlexMode.Fill;
	if (mode === "custom") return Enum.UIFlexMode.Custom;
	return Enum.UIFlexMode.None;
}

function alignEnum(align: FlexItemAlign): Enum.ItemLineAlignment {
	if (align === "start") return Enum.ItemLineAlignment.Start;
	if (align === "center") return Enum.ItemLineAlignment.Center;
	if (align === "end") return Enum.ItemLineAlignment.End;
	if (align === "stretch") return Enum.ItemLineAlignment.Stretch;
	return Enum.ItemLineAlignment.Automatic;
}

const useFlexItemStyles = componentStyles<{
	grow?: number;
	shrink?: number;
	fill?: boolean;
	alignSelf?: FlexItemAlign;
}>("FlexItem", (_: Theme, { grow, shrink, fill, alignSelf }) => {
	const mode = flexItemMode(grow, shrink, fill);
	const align = flexItemAlignKey(alignSelf);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		flex: {
			FlexMode: modeEnum(mode),
			GrowRatio: flexItemGrowRatio(grow),
			ShrinkRatio: flexItemShrinkRatio(shrink),
			ItemLineAlignment: alignEnum(align),
		} as WriteableStyle<UIFlexItem>,
	});
});

export default useFlexItemStyles;
