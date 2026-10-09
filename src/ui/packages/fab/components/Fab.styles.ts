import { componentStyles, controlFade, createStyles, Theme, WriteableStyle } from "theme";
import { FabSize, fabPixels } from "./fabSize";

export type FabColor = "primary" | "accent";

export interface FabStyleProps {
	size?: FabSize;
	color?: FabColor;
	disabled?: boolean;
	extended?: boolean;
}

const useFabStyles = componentStyles<FabStyleProps>(
	"Fab",
	(theme: Theme, { size = "medium", color = "primary", disabled, extended }) => {
		const diameter = fabPixels(size);
		const tone = color === "accent" ? theme.palette.accent : theme.palette.primary;
		return createStyles({
			root: {
				Size: extended === true ? new UDim2(0, 0, 0, diameter) : UDim2.fromOffset(diameter, diameter),
				AutomaticSize: extended === true ? Enum.AutomaticSize.X : Enum.AutomaticSize.None,
				BackgroundColor3: tone.main,
				BackgroundTransparency: disabled ? controlFade : 0,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				Text: "",
				ZIndex: 12000,
			} as WriteableStyle<TextButton>,
			corner: {
				CornerRadius: new UDim(1, 0),
			} as WriteableStyle<UICorner>,
			content: {
				Size: new UDim2(0, 0, 0, diameter),
				AutomaticSize: Enum.AutomaticSize.X,
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			padding: {
				PaddingLeft: new UDim(0, theme.padding.calc(2)),
				PaddingRight: new UDim(0, theme.padding.calc(2.5)),
			} as WriteableStyle<UIPadding>,
			row: {
				FillDirection: Enum.FillDirection.Horizontal,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				HorizontalAlignment: Enum.HorizontalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
			icon: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ScaleType: Enum.ScaleType.Fit,
				ImageColor3: tone.on,
				ImageTransparency: 0,
				LayoutOrder: 1,
			} as WriteableStyle<ImageLabel>,
			label: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.body,
				TextColor3: tone.on,
				TextTransparency: 0,
				LayoutOrder: 2,
			} as WriteableStyle<TextLabel>,
		});
	},
);

export default useFabStyles;
