import React, { useCallback, useEffect, useState } from "@rbxts/react";
import { cx, CustomizedProps, DEFAULT_THEME, useTheme, WriteableStyle } from "theme";
import { Icon } from "ui/packages/icon";
import { useDragScroll } from "ui/packages/scroll";
import { Typography } from "ui/packages/typography";
import { Icons } from "ui/enums";
import Tree from "../interfaces/Tree";
import useTreeViewStyles from "./TreeView.styles";
import { pathsToExpand, visibleRows } from "./treeRows";

type DefaultTreeViewComponent = Frame;

export interface TreeViewProps {
	tree: Tree;
	icon?: Icons;
	filter?: string;
	selected?: string;
}

function TreeView(props: CustomizedProps<DefaultTreeViewComponent, TreeViewProps>) {
	const { tree, icon, filter, selected, className, id, ref } = props;
	const { root, header, list, gridLayout, row, branchIcon, branchTypography, leafIcon, leafTypography } =
		useTreeViewStyles();
	const { theme } = useTheme();
	const step = theme.padding.calc(4);

	const [clickedPath, setClickedPath] = useState<string | undefined>();
	const [clickedLeaf, setClickedLeaf] = useState<string | undefined>();
	const [expanded, setExpanded] = useState<string[]>([]);
	const [canvasSize, setCanvasSize] = useState<UDim2>(new UDim2(0, 0, 0, 0));
	const [listFrame, setListFrame] = useState<ScrollingFrame>();
	const drag = useDragScroll(listFrame);

	const resizeScrollingFrame = (rbx: ScrollingFrame, child?: Instance) => {
		if (child && !child.IsA("GuiObject")) {
			return;
		}

		let height = 0;
		rbx.GetChildren().forEach((c) => {
			if (c.IsA("GuiObject")) {
				height += c.AbsoluteSize.Y;
			}
		});

		try {
			setCanvasSize(new UDim2(0, 0, 0, height));
		} catch {
			// Component is unmounting. Do nothing.
		}
	};

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

	return (
		<frame key={id || "TreeView"} ref={ref} {...root} {...className}>
			<Typography
				className={{ Text: tree.title, ...header } as WriteableStyle<TextLabel>}
				color={"textSecondary"}
				variant={"body"}
				family={"bold"}
			/>

			<scrollingframe
				key="List"
				ref={setListFrame}
				{...list}
				CanvasSize={canvasSize}
				Event={{
					AncestryChanged: resizeScrollingFrame,
					ChildAdded: resizeScrollingFrame,
					ChildRemoved: resizeScrollingFrame,
				}}
			>
				<uigridlayout {...gridLayout} />

				{rows.map((entry, index) => {
					const inset = (entry.kind === "leaf" ? entry.depth - 1 : entry.depth) * step;
					const branchLead = entry.icon !== undefined ? theme.spacing.calc(2) : 0;

					if (entry.kind === "branch" && entry.branch) {
						const branch = entry.branch;
						return (
							<textbutton
								key={`${entry.path}-${index}`}
								{...row}
								LayoutOrder={index}
								Event={{
									MouseButton1Click: () => {
										if (drag.suppressClick()) return;
										if (branch.onClick) branch.onClick();
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
										icon={expanded.includes(entry.path) ? Icons.Expanded : Icons.Collapsed}
										size={"xxs"}
										className={cx<ImageLabel>(
											branchIcon,
											inset > 0 && { Position: new UDim2(0, inset, 0.5, 0) },
										)}
										tint={DEFAULT_THEME.options.constants.extendedPalette.Gray[70]}
									/>
								)}
								{entry.icon !== undefined && (
									<Icon
										icon={entry.icon}
										size={"xs"}
										className={cx<ImageLabel>(branchIcon, {
											Position: new UDim2(0, inset + (entry.expandable ? branchLead : 0), 0.5, 0),
										})}
										tint={DEFAULT_THEME.palette.secondary.main}
									/>
								)}
								<Typography
									text={entry.title}
									className={
										cx<TextLabel>(
											branchTypography,
											(inset > 0 || branchLead > 0) && {
												Size: new UDim2(
													1,
													-(theme.spacing.calc(0.5) + theme.padding.calc(2) + inset + branchLead),
													1,
													-theme.padding.calc(4),
												),
											},
										) as WriteableStyle<TextLabel>
									}
									color={"textPrimary"}
									variant={"body"}
									family={entry.emphasized ? "bold" : "default"}
								/>
							</textbutton>
						);
					}

					const leaf = entry.leaf;
					return (
						<textbutton
							key={`${entry.path}-${index}`}
							{...row}
							LayoutOrder={index}
							Event={{
								MouseButton1Click: () => {
									if (drag.suppressClick()) return;
									setClickedLeaf(entry.path);
									setClickedPath(string.sub(entry.path, 1, entry.path.size() - entry.title.size() - 1));
									if (leaf && leaf.onClick) leaf.onClick();
								},
							}}
						>
							<Icon
								icon={entry.icon ?? icon ?? Icons.ListPrimary}
								size={"xs"}
								className={cx<ImageLabel>(
									leafIcon,
									inset > 0 && {
										Position: new UDim2(0, theme.padding.calc(4) + inset, 0.5, 0),
									},
								)}
								tint={DEFAULT_THEME.palette.secondary.main}
							/>
							<Typography
								text={entry.title}
								className={
									cx<TextLabel>(
										leafTypography,
										inset > 0 && {
											Size: new UDim2(
												1,
												-(theme.spacing.calc(1) + theme.padding.calc(6) + inset),
												1,
												-theme.padding.calc(4),
											),
										},
									) as WriteableStyle<TextLabel>
								}
								color={"textPrimary"}
								variant={"body"}
								family={
									(selected !== undefined ? selected === entry.path : clickedLeaf === entry.path)
										? "bold"
										: "default"
								}
							/>
						</textbutton>
					);
				})}
			</scrollingframe>
		</frame>
	);
}

export default TreeView;
