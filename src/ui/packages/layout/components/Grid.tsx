
import React from "react";
import { makeStyles, Theme, createStyles, WriteableStyle, CustomizedProps } from "theme";

export interface GridProps {
	cellPadding?: UDim;
	cellSize?: UDim2;
	fillDirection?: Enum.FillDirection;
	fillDirectionMaxCells?: number;
	sortOrder?: Enum.SortOrder;
	startCorner: Enum.StartCorner;
	horizontalAlignment?: Enum.HorizontalAlignment;
	veritcalAlignment?: Enum.VerticalAlignment;
}

const useGridStyles = makeStyles<GridProps>((_: Theme, props: GridProps) =>
	createStyles({
		baseGrid: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		baseLayout: {
			CellPadding: props.cellPadding,
			CellSize: props.cellSize,
			FillDirection: props.fillDirection,
			FillDirectionMaxCells: props.fillDirectionMaxCells,
			SortOrder: props.sortOrder,
			StartCorner: props.startCorner,
			HorizontalAlignment: props.horizontalAlignment,
			VerticalAlignment: props.veritcalAlignment,
		} as WriteableStyle<UIGridLayout>,
	}),
);

function Grid(props: CustomizedProps<Frame, GridProps>) {
	const {
		cellPadding = new UDim(0, 0),
		cellSize = UDim2.fromOffset(100, 100),
		fillDirection = Enum.FillDirection.Horizontal,
		fillDirectionMaxCells = 0,
		sortOrder = Enum.SortOrder.LayoutOrder,
		startCorner = Enum.StartCorner.TopLeft,
		horizontalAlignment = Enum.HorizontalAlignment.Left,
		veritcalAlignment = Enum.VerticalAlignment.Top,
		className,
		children,
		id,
		ref
	} = props;

	const { baseGrid, baseLayout } = useGridStyles({
		cellPadding,
		cellSize,
		fillDirection,
		fillDirectionMaxCells,
		sortOrder,
		startCorner,
		horizontalAlignment,
		veritcalAlignment,
	});

	return (
		<frame key={id || 'Grid'} ref={ref} {...baseGrid} {...className}>
			<uigridlayout key="GridLayout" {...baseLayout} />
			{children}
		</frame>
	);
}

export default Grid;
