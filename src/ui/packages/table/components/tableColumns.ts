export type TableAlign = "left" | "center" | "right";
export type TableSortDirection = "asc" | "desc";

export interface TableColumnSpec {
	header: unknown;
	width?: number | UDim;
	flex?: number;
	align?: TableAlign;
	sortable?: boolean;
}

export interface ResolvedColumn {
	header: unknown;
	width?: number | UDim;
	flex?: number;
	align: TableAlign;
	sortable: boolean;
}

export interface ColumnSize {
	scale: number;
	offset: number;
}

export function resolveColumn(column: string | TableColumnSpec): ResolvedColumn {
	if (typeIs(column, "string")) {
		return { header: column, align: "left", sortable: false };
	}
	return {
		header: column.header,
		width: column.width,
		flex: column.flex,
		align: column.align ?? "left",
		sortable: column.sortable === true,
	};
}

/** Scale/offset for each column. Number widths are scales. Flex shares whatever scale is left. */
export function columnSizes(columns: ReadonlyArray<Pick<ResolvedColumn, "width" | "flex">>): ColumnSize[] {
	let fixed = 0;
	let flexTotal = 0;
	for (const column of columns) {
		const width = column.width;
		if (typeIs(width, "number")) fixed += width;
		else if (width !== undefined) fixed += width.Scale;
		else flexTotal += column.flex ?? 1;
	}
	const remain = math.max(0, 1 - fixed);
	const sizes = new Array<ColumnSize>();
	for (const column of columns) {
		const width = column.width;
		if (typeIs(width, "number")) sizes.push({ scale: width, offset: 0 });
		else if (width !== undefined) sizes.push({ scale: width.Scale, offset: width.Offset });
		else {
			const flex = column.flex ?? 1;
			const share = flexTotal > 0 ? (flex / flexTotal) * remain : 0;
			sizes.push({ scale: share, offset: 0 });
		}
	}
	return sizes;
}

export function isTextCell(value: unknown) {
	return typeIs(value, "string") || value === undefined;
}

export function canSort(sortable: boolean | undefined, hasHandler: boolean) {
	return sortable === true && hasHandler;
}

export function headerText(label: string, active: boolean, direction?: TableSortDirection) {
	if (!active) return label;
	return direction === "desc" ? `${label} ↓` : `${label} ↑`;
}
