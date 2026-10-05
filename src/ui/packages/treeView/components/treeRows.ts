import type { Icons } from "ui/enums";
import type Branch from "../interfaces/Branch";
import type Leaf from "../interfaces/Leaf";

export interface TreeRow {
	kind: "branch" | "leaf";
	title: string;
	path: string;
	depth: number;
	emphasized: boolean;
	expandable: boolean;
	icon?: Icons;
	branch?: Branch;
	leaf?: Leaf;
}

export interface TreeRowLayout {
	chevronX: number;
	iconX: number;
	labelX: number;
}

export function treeRowLayout(depth: number, indent: number, chevronWidth: number, iconWidth: number): TreeRowLayout {
	const chevronX = depth * indent;
	const iconX = chevronX + chevronWidth;
	return { chevronX, iconX, labelX: iconX + iconWidth };
}

function count<T>(list: ReadonlyArray<T> | undefined) {
	if (list === undefined) return 0;
	let total = 0;
	for (const _ of list) total++;
	return total;
}

export function branchHoldsSelection(branchPath: string, selected?: string) {
	if (selected === undefined || selected === "" || branchPath === "") return false;
	if (selected === branchPath) return true;
	const branchParts = branchPath.split("/");
	const selectedParts = selected.split("/");
	if (count(branchParts) >= count(selectedParts)) return false;
	let index = 0;
	for (const part of branchParts) {
		if (selectedParts[index] !== part) return false;
		index++;
	}
	return true;
}

function branchHit(branch: Branch, matches: (title: string) => boolean): boolean {
	if (matches(branch.title)) return true;
	for (const leaf of branch.leaves) {
		if (matches(leaf.title)) return true;
	}
	for (const child of branch.branches ?? []) {
		if (branchHit(child, matches)) return true;
	}
	return false;
}

export function pathsToExpand(branches: Branch[], matches: (title: string) => boolean) {
	const paths: string[] = [];
	const visit = (branch: Branch, parentPath: string) => {
		const path = parentPath === "" ? branch.title : `${parentPath}/${branch.title}`;
		let hit = matches(branch.title);
		for (const leaf of branch.leaves) {
			if (matches(leaf.title)) hit = true;
		}
		for (const child of branch.branches ?? []) {
			if (visit(child, path)) hit = true;
		}
		if (hit) paths.push(path);
		return hit;
	};
	for (const branch of branches) visit(branch, "");
	return paths;
}

export function visibleRows(
	branches: Branch[],
	expanded: string[],
	selected?: string,
	clickedPath?: string,
	matches?: (title: string) => boolean,
) {
	const rows: TreeRow[] = [];
	const isOpen = (path: string) => {
		for (const item of expanded) {
			if (item === path) return true;
		}
		return false;
	};
	const visit = (branch: Branch, parentPath: string, depth: number) => {
		if (matches !== undefined && !branchHit(branch, matches)) return;
		const path = parentPath === "" ? branch.title : `${parentPath}/${branch.title}`;
		const expandable = count(branch.leaves) > 0 || count(branch.branches) > 0;
		rows.push({
			kind: "branch",
			title: branch.title,
			path,
			depth,
			emphasized:
				selected !== undefined && selected !== ""
					? branchHoldsSelection(path, selected)
					: clickedPath === path,
			expandable,
			icon: branch.icon,
			branch,
		});
		if (!isOpen(path)) return;
		for (const child of branch.branches ?? []) visit(child, path, depth + 1);
		const showAllLeaves = matches === undefined || matches(branch.title);
		for (const leaf of branch.leaves) {
			if (!showAllLeaves && !matches(leaf.title)) continue;
			const leafPath = `${path}/${leaf.title}`;
			rows.push({
				kind: "leaf",
				title: leaf.title,
				path: leafPath,
				depth: depth + 1,
				emphasized: selected === leafPath,
				expandable: false,
				icon: leaf.icon,
				leaf,
			});
		}
	};
	for (const branch of branches) visit(branch, "", 0);
	return rows;
}
