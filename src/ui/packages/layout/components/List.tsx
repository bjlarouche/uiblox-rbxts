
import React from "react";
import { makeStyles, Theme, createStyles, WriteableStyle, CustomizedProps } from "theme";

export interface ListProps {
	padding?: UDim;
	fillDirection?: Enum.FillDirection;
	sortOrder?: Enum.SortOrder;
	wrap?: "wrap" | "no-wrap";
	horizontalAlignment?: Enum.HorizontalAlignment;
	horizontalFlex?: Enum.UIFlexAlignment;
	veritcalAlignment?: Enum.VerticalAlignment;
	verticalFlex?: Enum.UIFlexAlignment;
}

const useListStyles = makeStyles<ListProps>((_: Theme, props: ListProps) =>
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
			VerticalAlignment: props.veritcalAlignment,
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
		veritcalAlignment = Enum.VerticalAlignment.Top,
		verticalFlex = Enum.UIFlexAlignment.None,
		className,
		children,
		key,
	} = props;

	const { baseList, baseLayout } = useListStyles({
		padding,
		fillDirection,
		sortOrder,
		wrap,
		horizontalAlignment,
		horizontalFlex,
		veritcalAlignment,
		verticalFlex,
	});

	return (
		<frame key={key || 'List'} {...baseList} {...className}>
			<uilistlayout {...baseLayout} />
			{children}
		</frame>
	);
}

export default List;
