import React, { useCallback, useEffect, useRef, useState } from "@rbxts/react";
import { cx, CustomizedProps, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { Icon } from "ui/packages/icon";
import { Typography } from "ui/packages/typography";
import { VirtualList, VirtualListHandle } from "ui/packages/virtualList";
import { Icons } from "ui/enums";
import Tree from "../interfaces/Tree";
import useTreeViewStyles from "./TreeView.styles";
import { pathsToExpand, TreeRow, treeRowLayout, visibleRows } from "./treeRows";

type DefaultTreeViewComponent = Frame;

export interface TreeViewProps {
	tree: Tree;
	icon?: Icons;
	filter?: string;
	selected?: string;
}

function TreeView(props: CustomizedProps<DefaultTreeViewComponent, TreeViewProps>) {
	const { tree, icon, filter, selected, className,
		sx, id, ref } = props;
	const { root, header, list, row, selectedRow, rowIcon, label } = useTreeViewStyles();
	const { theme } = useTheme();
	const step = theme.padding.calc(4);
	const chevronWidth = theme.spacing.calc(1.5);
	const iconWidth = theme.spacing.calc(2) + theme.padding.calc(1);
	const itemHeight = theme.spacing.calc(3);
	const listRef = useRef<VirtualListHandle>();

	const [clickedPath, setClickedPath] = useState<string | undefined>();
	const [clickedLeaf, setClickedLeaf] = useState<string | undefined>();
	const [expanded, setExpanded] = useState<string[]>([]);

	const matchesFilter = useCallback(
		(title: string) => {
			let isMatch = false;

			if (filter === undefined || filter?.size() === 0) {
				return true;
			}

			const parts = title.split("/");

			parts.forEach((part) => {
				if (
					part.size() >= filter.size() &&
					string.sub(string.upper(part), 1, filter.size()) === string.upper(filter)
				) {
					isMatch = true;
				}
			});

			return isMatch;
		},
		[filter],
	);

	useEffect(() => {
		if (filter === undefined || filter?.size() === 0) {
			setExpanded([]);
			return;
		}

		setExpanded(pathsToExpand(tree.branches, matchesFilter));
	}, [tree, filter]);

	useEffect(() => {
		if (selected === undefined || selected.size() === 0) return;
		const parts = selected.split("/");
		const ancestors: string[] = [];
		let acc = "";
		for (let i = 0; i < parts.size() - 1; i++) {
			acc = i === 0 ? parts[i] : `${acc}/${parts[i]}`;
			ancestors.push(acc);
		}
		if (ancestors.size() === 0) return;
		setExpanded((old) => {
			let updated = old;
			for (const path of ancestors) {
				if (!updated.includes(path)) updated = [...updated, path];
			}
			return updated;
		});
	}, [tree, filter, selected]);

	const rows = visibleRows(tree.branches, expanded, selected, clickedPath, matchesFilter);
	const selectedIndex =
		selected !== undefined && selected.size() > 0 ? rows.findIndex((entry) => entry.path === selected) : -1;

	useEffect(() => {
		if (selectedIndex >= 0) listRef.current?.ensureVisible(selectedIndex);
	}, [selected, selectedIndex]);

	const renderRow = (entry: TreeRow) => {
		const { chevronX, iconX, labelX } = treeRowLayout(entry.depth, step, chevronWidth, iconWidth);
		const rowIconImage = entry.kind === "leaf" ? (entry.icon ?? icon ?? Icons.ListPrimary) : entry.icon;
		const bold =
			entry.kind === "branch"
				? entry.emphasized
				: selected !== undefined
					? selected === entry.path
					: clickedLeaf === entry.path;
		const picked =
			selected !== undefined && selected.size() > 0
				? entry.path === selected
				: entry.kind === "leaf" && clickedLeaf === entry.path;

		return (
			<textbutton
				{...cx<TextButton>(row, picked ? selectedRow : undefined)}
				Event={{
					MouseButton1Click: () => {
						if (listRef.current?.suppressClick()) return;
						if (entry.kind === "leaf") {
							setClickedLeaf(entry.path);
							setClickedPath(string.sub(entry.path, 1, entry.path.size() - entry.title.size() - 1));
							entry.leaf?.onClick?.();
							return;
						}
						entry.branch?.onClick?.();
						if (entry.expandable) {
							setExpanded((oldExpanded) =>
								oldExpanded.includes(entry.path)
									? oldExpanded.filter((item) => item !== entry.path)
									: [...oldExpanded, entry.path],
							);
						} else {
							setClickedPath(entry.path);
						}
					},
				}}
			>
				{entry.expandable && (
					<Icon
						key="Chevron"
						icon={expanded.includes(entry.path) ? Icons.Expanded : Icons.Collapsed}
						size={"xxs"}
						className={cx<ImageLabel>(rowIcon, {
							AnchorPoint: new Vector2(0.5, 0.5),
							Position: new UDim2(0, chevronX + chevronWidth / 2, 0.5, 0),
						})}
						tint={theme.palette.text.secondary}
					/>
				)}
				{rowIconImage !== undefined && (
					<Icon
						key="Icon"
						icon={rowIconImage}
						size={"xs"}
						className={cx<ImageLabel>(rowIcon, { Position: new UDim2(0, iconX, 0.5, 0) })}
						tint={theme.palette.primary.main}
					/>
				)}
				<Typography
					text={entry.title}
					noWrap
					className={
						cx<TextLabel>(label, {
							Position: new UDim2(0, labelX, 0.5, 0),
							Size: new UDim2(1, -labelX, 1, -theme.padding.calc(4)),
						}) as WriteableStyle<TextLabel>
					}
					color={"textPrimary"}
					variant={"body"}
					family={bold ? "bold" : "default"}
				/>
			</textbutton>
		);
	};

	return (
		<SxHost tag="frame" key={id || "TreeView"} hostRef={ref} base={root} className={className} sx={sx}>
			<Typography
				text={tree.title}
				noWrap
				className={header}
				color={"textSecondary"}
				variant={"body"}
				family={"bold"}
			/>

			<VirtualList
				key="List"
				items={rows}
				getKey={(entry) => entry.path}
				itemHeight={itemHeight}
				listRef={listRef}
				className={list}
				renderItem={(entry) => renderRow(entry)}
			/>
		</SxHost>
	);
}

export default TreeView;
