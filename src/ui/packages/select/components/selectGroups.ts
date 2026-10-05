export interface GroupedChoice {
	label: string;
	disabled?: boolean;
	group?: string;
}

export interface SelectHeaderRow {
	kind: "header";
	label: string;
}

export interface SelectOptionRow {
	kind: "option";
	label: string;
	optionIndex: number;
	disabled?: boolean;
}

export type SelectRow = SelectHeaderRow | SelectOptionRow;

export function groupRows(options: GroupedChoice[]): SelectRow[] {
	const rows = new Array<SelectRow>();
	let current = "";
	for (let index = 0; index < options.size(); index++) {
		const option = options[index];
		const group = option.group;
		if (group !== undefined && group !== current) {
			current = group;
			rows.push({ kind: "header", label: group });
		}
		rows.push({
			kind: "option",
			label: option.label,
			optionIndex: index,
			disabled: option.disabled,
		});
	}
	return rows;
}

export function rowForOption(rows: SelectRow[], optionIndex: number) {
	for (let index = 0; index < rows.size(); index++) {
		const row = rows[index];
		if (row.kind === "option" && row.optionIndex === optionIndex) return index;
	}
	return 0;
}
