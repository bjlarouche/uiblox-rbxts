import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { ContainerMaxWidth, containerMaxPx } from "./containerWidth";

const useContainerStyles = componentStyles<{ maxWidth?: ContainerMaxWidth; disableGutters?: boolean }>(
	"Container",
	(theme: Theme, { maxWidth, disableGutters }) => {
		const maxPx = containerMaxPx(maxWidth);
		const gutter = theme.spacing.calc(2);
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			inner: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				Position: new UDim2(0.5, 0, 0, 0),
				AnchorPoint: new Vector2(0.5, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			constraint: {
				MaxSize: maxPx !== undefined ? new Vector2(maxPx, math.huge) : new Vector2(math.huge, math.huge),
			} as WriteableStyle<UISizeConstraint>,
			gutter: {
				PaddingTop: new UDim(0, 0),
				PaddingBottom: new UDim(0, 0),
				PaddingLeft: new UDim(0, disableGutters === true ? 0 : gutter),
				PaddingRight: new UDim(0, disableGutters === true ? 0 : gutter),
			} as WriteableStyle<UIPadding>,
		});
	},
);

export default useContainerStyles;
