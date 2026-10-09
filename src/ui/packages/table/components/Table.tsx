import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { rowSelected } from "./rowSelected";
import { sortedRowOrder } from "./tableSort";
import {
	canSort,
	columnSizes,
	headerText,
	isTextCell,
	resolveColumn,
	TableAlign,
	TableSortDirection,
} from "./tableColumns";
import useTableStyles from "./Table.styles";

export interface TableColumn {
	header: string | React.ReactNode;
	width?: number | UDim;
	flex?: number;
	align?: TableAlign;
	sortable?: boolean;
}

export type TableCell = string | React.ReactNode;

export interface TableProps {
	columns: Array<string | TableColumn>;
	rows: Array<Array<TableCell>>;
	selected?: number;
	dense?: boolean;
	sortColumn?: number;
	sortDirection?: TableSortDirection;
	onSort?: (column: number) => void;
	onRowActivated?: (index: number) => void;
}

function TableRow(props: {
	rowIndex: number;
	place: number;
	selected: boolean;
	styles: ReturnType<typeof useTableStyles>;
	onActivated: () => void;
	children: React.ReactNode;
}) {
	const [hovering, setHovering] = useState(false);
	const face = props.selected ? props.styles.selected : hovering ? props.styles.hover : undefined;
	return (
		<textbutton
			key={`r-${props.rowIndex}`}
			{...cx<TextButton>(props.styles.row, face)}
			LayoutOrder={props.place + 1}
			Event={{
				Activated: props.onActivated,
				MouseEnter: () => setHovering(true),
				MouseLeave: () => setHovering(false),
			}}
		>
			<uipadding {...props.styles.tail} />
			<frame key="Band" {...props.styles.band}>
				<uilistlayout {...props.styles.cells} />
				{props.children}
			</frame>
		</textbutton>
	);
}

function textAlign(align: TableAlign) {
	if (align === "center") return Enum.TextXAlignment.Center;
	if (align === "right") return Enum.TextXAlignment.Right;
	return Enum.TextXAlignment.Left;
}

function Table(props: CustomizedProps<Frame, TableProps>) {
	const { columns, rows, selected, dense, sortColumn, sortDirection, onSort, onRowActivated, className, sx, id, ref } = props;
	const styles = useTableStyles({ dense });
	const resolved = columns.map((column) => resolveColumn(column));
	const sizes = columnSizes(resolved);
	const order = sortedRowOrder(rows, sortColumn, sortDirection);

	return (
		<SxHost tag="frame" key={id || "Table"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uicorner {...styles.corner} />
			<uilistlayout {...styles.list} />
			<frame key="Header" {...styles.header} LayoutOrder={0}>
				<uipadding {...styles.tail} />
				<frame key="Band" {...styles.band}>
				<uilistlayout {...styles.cells} />
				<>
					{resolved.map((column, index) => {
						const size = sizes[index];
						const box = new UDim2(size.scale, size.offset, 0, 0);
						const align = textAlign(column.align);
						const active = sortColumn === index && column.sortable;
						const label = typeIs(column.header, "string") ? headerText(column.header, active, sortDirection) : undefined;
						const clickable = canSort(column.sortable, onSort !== undefined);
						if (clickable) {
							return (
								<textbutton
									key={`h-${index}`}
									{...(cx<TextLabel>(styles.cell, styles.headerCell) as WriteableStyle<TextButton>)}
									Text={label ?? ""}
									Size={box}
									TextXAlignment={align}
									AutoButtonColor={false}
									LayoutOrder={index}
									Event={{ Activated: () => onSort?.(index) }}
								>
									{label === undefined && (column.header as React.ReactNode)}
								</textbutton>
							);
						}
						if (label !== undefined) {
							return (
								<textlabel
									key={`h-${index}`}
									{...cx<TextLabel>(styles.cell, styles.headerCell)}
									Text={label}
									Size={box}
									TextXAlignment={align}
									LayoutOrder={index}
								/>
							);
						}
						return (
							<frame key={`h-${index}`} Size={box} AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1} BorderSizePixel={0} LayoutOrder={index}>
								{column.header as React.ReactNode}
							</frame>
						);
					})}
				</>
				</frame>
			</frame>
			<>
				{order.map((rowIndex, place) => {
					const cells = rows[rowIndex];
					return (
						<TableRow
							key={`r-${rowIndex}`}
							rowIndex={rowIndex}
							place={place}
							selected={rowSelected(rowIndex, selected)}
							styles={styles}
							onActivated={() => onRowActivated?.(rowIndex)}
						>
							<>
								{resolved.map((column, colIndex) => {
									const size = sizes[colIndex];
									const box = new UDim2(size.scale, size.offset, 0, 0);
									const value = cells[colIndex];
									if (isTextCell(value)) {
										return (
											<textlabel
												key={`c-${rowIndex}-${colIndex}`}
												{...styles.cell}
												Text={(value as string | undefined) ?? ""}
												Size={box}
												TextXAlignment={textAlign(column.align)}
												LayoutOrder={colIndex}
											/>
										);
									}
									return (
										<frame
											key={`c-${rowIndex}-${colIndex}`}
											Size={box}
											AutomaticSize={Enum.AutomaticSize.Y}
											BackgroundTransparency={1}
											BorderSizePixel={0}
											LayoutOrder={colIndex}
										>
											{value}
										</frame>
									);
								})}
							</>
						</TableRow>
					);
				})}
			</>
		</SxHost>
	);
}

export default Table;
