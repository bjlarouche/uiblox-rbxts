
import React from "@rbxts/react";
import { componentStyles, Theme, createStyles, WriteableStyle, CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";

export interface ListProps {
	padding?: UDim;
	fillDirection?: Enum.FillDirection;
	sortOrder?: Enum.SortOrder;
	wrap?: "wrap" | "no-wrap";
	horizontalAlignment?: Enum.HorizontalAlignment;
	horizontalFlex?: Enum.UIFlexAlignment;
	verticalAlignment?: Enum.VerticalAlignment;
	verticalFlex?: Enum.UIFlexAlignment;
}

const useListStyles = componentStyles<ListProps>("List", (_: Theme, props: ListProps) =>
	createStyles({
		baseList: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		baseLayout: {
			Padding: props.padding,
			FillDirection: props.fillDirection,
			SortOrder: props.sortOrder,
			Wraps: props.wrap === "wrap",
			HorizontalAlignment: props.horizontalAlignment,
			HorizontalFlex: props.horizontalFlex,
			VerticalAlignment: props.verticalAlignment,
			VerticalFlex: props.verticalFlex,
		} as WriteableStyle<UIListLayout>,
	}),
);

function List(props: CustomizedProps<Frame, ListProps>) {
	const {
		padding = new UDim(0, 0),
		fillDirection = Enum.FillDirection.Horizontal,
		sortOrder = Enum.SortOrder.LayoutOrder,
		wrap = "wrap",
		horizontalAlignment = Enum.HorizontalAlignment.Left,
		horizontalFlex = Enum.UIFlexAlignment.None,
		verticalAlignment = Enum.VerticalAlignment.Top,
		verticalFlex = Enum.UIFlexAlignment.None,
		className,
		sx,
		children,
		id,
		ref
	} = props;

	const { baseList, baseLayout } = useListStyles({
		padding,
		fillDirection,
		sortOrder,
		wrap,
		horizontalAlignment,
		horizontalFlex,
		verticalAlignment,
		verticalFlex,
	});

	return (
		<SxHost tag="frame" key={id || 'List'} hostRef={ref} base={baseList} className={className} sx={sx}>
			<uilistlayout key="ListLayout" {...baseLayout} />
			{children}
		</SxHost>
	);
}

export default List;
