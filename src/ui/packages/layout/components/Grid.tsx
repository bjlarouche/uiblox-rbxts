import React from "@rbxts/react";
import { componentStyles, Theme, createStyles, WriteableStyle, CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { GridCorner, gridCornerKey, gridMaxCells } from "./gridProps";

export interface GridProps {
	cellPadding?: UDim2;
	cellSize?: UDim2;
	gap?: number;
	columns?: number;
	maxColumns?: number;
	fillDirection?: Enum.FillDirection;
	fillDirectionMaxCells?: number;
	sortOrder?: Enum.SortOrder;
	startCorner?: Enum.StartCorner | GridCorner;
	horizontalAlignment?: Enum.HorizontalAlignment;
	verticalAlignment?: Enum.VerticalAlignment;
}

function cornerEnum(corner?: Enum.StartCorner | GridCorner): Enum.StartCorner | undefined {
	if (corner === undefined) return undefined;
	if (!typeIs(corner, "string")) return corner;
	const key = gridCornerKey(corner);
	if (key === "top-right") return Enum.StartCorner.TopRight;
	if (key === "bottom-left") return Enum.StartCorner.BottomLeft;
	if (key === "bottom-right") return Enum.StartCorner.BottomRight;
	return Enum.StartCorner.TopLeft;
}

const useGridStyles = componentStyles<GridProps>("Grid", (theme: Theme, props: GridProps) => {
	const cells = gridMaxCells(props.columns, props.maxColumns, props.fillDirectionMaxCells);
	const pad =
		props.gap !== undefined
			? UDim2.fromOffset(theme.spacing.calc(props.gap), theme.spacing.calc(props.gap))
			: props.cellPadding;
	return createStyles({
		baseGrid: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		baseLayout: {
			CellPadding: pad,
			CellSize: props.cellSize,
			FillDirection: props.fillDirection,
			FillDirectionMaxCells: cells,
			SortOrder: props.sortOrder,
			StartCorner: cornerEnum(props.startCorner),
			HorizontalAlignment: props.horizontalAlignment,
			VerticalAlignment: props.verticalAlignment,
		} as WriteableStyle<UIGridLayout>,
	});
});

function Grid(props: CustomizedProps<Frame, GridProps>) {
	const {
		cellPadding = UDim2.fromScale(0, 0),
		cellSize = UDim2.fromOffset(100, 100),
		gap,
		columns,
		maxColumns,
		fillDirection = Enum.FillDirection.Horizontal,
		fillDirectionMaxCells = 0,
		sortOrder = Enum.SortOrder.LayoutOrder,
		startCorner = Enum.StartCorner.TopLeft,
		horizontalAlignment = Enum.HorizontalAlignment.Left,
		verticalAlignment = Enum.VerticalAlignment.Top,
		className,
		sx,
		children,
		id,
		ref,
	} = props;

	const { baseGrid, baseLayout } = useGridStyles({
		cellPadding,
		cellSize,
		gap,
		columns,
		maxColumns,
		fillDirection,
		fillDirectionMaxCells,
		sortOrder,
		startCorner,
		horizontalAlignment,
		verticalAlignment,
	});

	return (
		<SxHost key={id || "Grid"} hostRef={ref} base={baseGrid} className={className} sx={sx}>
			<uigridlayout key="GridLayout" {...baseLayout} />
			{children}
		</SxHost>
	);
}

export default Grid;
