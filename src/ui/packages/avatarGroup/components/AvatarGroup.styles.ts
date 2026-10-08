import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { AvatarVariant } from "ui/packages/avatar/components/Avatar.styles";

const useAvatarGroupStyles = componentStyles<{ size?: number; variant?: AvatarVariant }>(
	"AvatarGroup",
	(theme: Theme, { size = 40, variant = "circular" }) => {
		const overlap = math.max(theme.padding.calc(1), math.floor(size / 4));
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: Enum.FillDirection.Horizontal,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, -overlap),
			} as WriteableStyle<UIListLayout>,
			surplus: {
				Size: UDim2.fromOffset(size, size),
				BackgroundColor3: theme.palette.surface.elevated,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			surplusText: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: math.max(12, size * 0.35),
				TextColor3: theme.palette.text.primary,
			} as WriteableStyle<TextLabel>,
			corner: {
				CornerRadius: variant === "rounded" ? new UDim(0, theme.shape.borderRadius) : new UDim(1, 0),
			} as WriteableStyle<UICorner>,
		});
	},
);

export default useAvatarGroupStyles;
