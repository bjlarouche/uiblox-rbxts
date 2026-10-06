import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { weekCellScales } from "./weekColumns";

export interface WeekGridColumn {
	id: string;
	label: string;
}

export interface WeekGridCell {
	columnId: string;
	text?: string;
}

export interface WeekGridRow {
	id: string;
	label: string;
	cells: WeekGridCell[];
}

export interface WeekGridProps {
	columns: WeekGridColumn[];
	rows: WeekGridRow[];
	narrow?: boolean;
	day?: number;
	empty?: string;
	onCell?: (rowId: string, columnId: string) => void;
}

function shownColumns(columns: WeekGridColumn[], narrow?: boolean, day?: number) {
	if (narrow !== true) return columns;
	const index = day !== undefined && day >= 0 && day < columns.size() ? day : 0;
	const column = columns[index];
	return column !== undefined ? [column] : [];
}

function readCell(row: WeekGridRow, columnId: string) {
	for (const cell of row.cells) {
		if (cell.columnId === columnId && cell.text !== undefined && cell.text !== "") return cell.text;
	}
	return undefined;
}

function WeekLine(props: {
	name: string;
	nameScale: number;
	dayScale: number;
	header?: boolean;
	cells: { id: string; text: string; blank: boolean }[];
	onCell?: (columnId: string) => void;
}) {
	const { theme } = useTheme();
	const font = theme.typography.fontFamilies.default;
	const size = props.header === true ? theme.typography.fontSizes.caption : theme.typography.fontSizes.body;
	const color = props.header === true ? theme.palette.text.secondary : theme.palette.text.primary;
	return (
		<frame Size={new UDim2(1, 0, 0, props.header === true ? 28 : 40)} BackgroundTransparency={1} BorderSizePixel={0}>
			<uilistlayout FillDirection={Enum.FillDirection.Horizontal} SortOrder={Enum.SortOrder.LayoutOrder} />
			<textlabel
				LayoutOrder={0}
				Size={new UDim2(props.nameScale, 0, 1, 0)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Font={font}
				TextSize={size}
				TextColor3={color}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextTruncate={Enum.TextTruncate.AtEnd}
				Text={props.name}
			/>
			{props.cells.map((cell, index) => (
				<textbutton
					key={cell.id}
					LayoutOrder={index + 1}
					Size={new UDim2(props.dayScale, 0, 1, 0)}
					BackgroundColor3={theme.palette.surface.paper}
					BackgroundTransparency={cell.blank || props.header === true ? 1 : 0}
					BorderSizePixel={0}
					Font={font}
					TextSize={size}
					TextColor3={cell.blank ? theme.palette.text.secondary : color}
					TextTruncate={Enum.TextTruncate.AtEnd}
					Text={cell.text}
					AutoButtonColor={props.onCell !== undefined}
					Event={{
						Activated: () => props.onCell?.(cell.id),
					}}
				/>
			))}
		</frame>
	);
}

function WeekGrid(props: CustomizedProps<Frame, WeekGridProps>) {
	const { columns, rows, narrow, day, empty = "Off", onCell, className, sx, id, ref } = props;
	const visible = shownColumns(columns, narrow, day);
	const scales = weekCellScales(columns.size(), narrow);
	const headerCells = visible.map((column) => ({ id: column.id, text: column.label, blank: true }));
	return (
		<SxHost
			tag="frame"
			key={id || "WeekGrid"}
			hostRef={ref}
			base={{
				Size: new UDim2(1, 0, 0, 0),
				AutomaticSize: Enum.AutomaticSize.Y,
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			}}
			className={className}
			sx={sx}
		>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} SortOrder={Enum.SortOrder.LayoutOrder} />
			<WeekLine name="Crew" nameScale={scales.name} dayScale={scales.day} header cells={headerCells} />
			{rows.map((row) => (
				<WeekLine
					key={row.id}
					name={row.label}
					nameScale={scales.name}
					dayScale={scales.day}
					cells={visible.map((column) => {
						const text = readCell(row, column.id);
						return { id: column.id, text: text ?? empty, blank: text === undefined };
					})}
					onCell={onCell !== undefined ? (columnId) => onCell(row.id, columnId) : undefined}
				/>
			))}
		</SxHost>
	);
}

export default WeekGrid;
