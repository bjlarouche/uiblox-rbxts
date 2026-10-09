import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { ROBLOX_UI_OFFSET } from "ui/constants";
import { SidebarProps } from "./Sidebar";

const useSidebarStyles = componentStyles<SidebarProps>("Sidebar", (theme: Theme, props: SidebarProps) => {
	const { size, ignoreInset = false } = props;

	const sidebarWidths = {
		large: 180,
		compact: 60,
	};

	return createStyles({
		root: {
			Size: new UDim2(0, size === "compact" ? sidebarWidths.compact : sidebarWidths.large, 1, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
			ZIndex: 5000,
		} as WriteableStyle<Frame>,
		container: {
			Size: new UDim2(
				1,
				-theme.padding.calc(4),
				1,
				-(theme.padding.calc(4) + (ignoreInset ? 0 : ROBLOX_UI_OFFSET)),
			),
			Position: new UDim2(0.5, 0, 0, theme.padding.calc(2) + (ignoreInset ? 0 : ROBLOX_UI_OFFSET)),
			AnchorPoint: new Vector2(0.5, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ClipsDescendants: true,
			ZIndex: 5100,
		} as WriteableStyle<Frame>,
	});
});

export default useSidebarStyles;
