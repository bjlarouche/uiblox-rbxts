import React from "@rbxts/react";
import { CustomizedProps, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";

export interface ScrollViewProps {
	children?: React.ReactNode;
}

function ScrollView(props: CustomizedProps<ScrollingFrame, ScrollViewProps>) {
	const { children, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const root: WriteableStyle<ScrollingFrame> = {
		Size: UDim2.fromScale(1, 1),
		BackgroundTransparency: 1,
		BorderSizePixel: 0,
		CanvasSize: UDim2.fromScale(0, 0),
		AutomaticCanvasSize: Enum.AutomaticSize.Y,
		ScrollingDirection: Enum.ScrollingDirection.Y,
		ScrollBarThickness: theme.spacing.calc(0.5),
		ScrollBarImageColor3: theme.palette.text.secondary,
	};

	return (
		<SxHost tag="scrollingframe" key={id || "ScrollView"} hostRef={ref} base={root} className={className} sx={sx}>
			{children}
		</SxHost>
	);
}

export default ScrollView;
