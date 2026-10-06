import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { rowSelected } from "./rowSelected";
import { SxHost } from "ui/packages/host";
import useTableStyles from "./Table.styles";

export interface TableProps {
	columns: string[];
	rows: string[][];
	selected?: number;
	dense?: boolean;
	onRowActivated?: (index: number) => void;
}

function Table(props: CustomizedProps<Frame, TableProps>) {
	const { columns, rows, selected, dense, onRowActivated, className, sx, id, ref } = props;
	const styles = useTableStyles({ dense });
	const width = columns.size() > 0 ? 1 / columns.size() : 1;

	return (
		<SxHost tag="frame" key={id || "Table"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uicorner {...styles.corner} />
			<uilistlayout {...styles.list} />
			<frame key="Header" {...styles.header} LayoutOrder={0}>
				<uipadding {...styles.padding} />
				<uilistlayout {...styles.cells} />
				<>
				{columns.map((label, index) => (
					<textlabel
						key={`h-${label}-${index}`}
						{...cx<TextLabel>(styles.cell, styles.headerCell)}
						Text={label}
						Size={new UDim2(width, 0, 0, 0)}
						LayoutOrder={index}
					/>
				))}
				</>
			</frame>
			<>
			{rows.map((cells, rowIndex) => (
				<textbutton
					key={`r-${rowIndex}`}
					{...cx<TextButton>(styles.row, rowSelected(rowIndex, selected) && styles.selected)}
					LayoutOrder={rowIndex + 1}
					Event={{
						Activated: () => onRowActivated?.(rowIndex),
					}}
				>
					<uipadding {...styles.padding} />
					<uilistlayout {...styles.cells} />
					<>
					{columns.map((_, colIndex) => (
						<textlabel
							key={`c-${rowIndex}-${colIndex}`}
							{...styles.cell}
							Text={cells[colIndex] ?? ""}
							Size={new UDim2(width, 0, 0, 0)}
							LayoutOrder={colIndex}
						/>
					))}
					</>
				</textbutton>
			))}
			</>
		</SxHost>
	);
}

export default Table;
