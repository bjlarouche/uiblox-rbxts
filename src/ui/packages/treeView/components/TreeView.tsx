import Roact from "@rbxts/roact";
import { hooked, useCallback, useEffect, useState } from "@rbxts/roact-hooked";
import { CustomizedProps, DefaultTheme, WriteableStyle } from "theme";
import { Icon } from "ui/packages/icon";
import { Typography } from "ui/packages/typography";
import { Icons } from "../../../enums";
import Branch from "../interfaces/Branch";
import Leaf from "../interfaces/Leaf";
import Tree from "../interfaces/Tree";
import useTreeViewStyles from "./TreeView.styles";

type DefaultTreeViewComponent = Frame;

export interface TreeViewProps {
	tree: Tree;
	icon?: Icons;
	filter?: string;
}

const TreeView = hooked<CustomizedProps<DefaultTreeViewComponent, TreeViewProps>>((props) => {
	const { tree, icon, filter, className } = props;
	const { root, header, list, gridLayout, row, branchIcon, branchTypography, leafIcon, leafTypography } =
		useTreeViewStyles();

	const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>();
	const [selectedLeaf, setSelectedLeaf] = useState<Leaf | undefined>();
	const [expanded, setExpanded] = useState<Branch[]>([]);
	const [canvasSize, setCanvasSize] = useState<UDim2>(new UDim2(1, 0, 1, 0));

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
			setCanvasSize(new UDim2(0, rbx.AbsoluteSize.X, 0, height));
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

	// Automatically expand branches that match filter
	useEffect(() => {
		if (filter === undefined || filter?.size() === 0) {
			setExpanded([]);
			return;
		}

		const newExpanded: Branch[] = [];

		// Figure out which branches should be expanded
		tree.branches.forEach((branch) => {
			const matchesBranchFilter = matchesFilter(branch.title);

			if (matchesBranchFilter) {
				// If branch is a match, whole branch should be expanded
				if (!newExpanded.includes(branch)) {
					newExpanded.push(branch);
				}
			} else {
				// If any of the leaves are a match, branch should be expanded
				branch.leaves.forEach((leaf) => {
					if (newExpanded.includes(branch)) return; // Already expanded.

					const matchesLeafFilter = matchesFilter(leaf.title);

					if (matchesLeafFilter) {
						newExpanded.push(branch);
					}
				});
			}
		});

		// Set expanded to new array
		setExpanded(newExpanded);
	}, [tree, filter]);

	return (
		<frame Key="TreeView" {...root} {...className}>
			<Typography
				className={{ Text: tree.title, ...header } as WriteableStyle<TextLabel>}
				color={"textSecondary"}
				variant={"body"}
				family={"bold"}
			/>

			<scrollingframe
				Key="List"
				{...list}
				CanvasSize={canvasSize}
				Event={{
					AncestryChanged: resizeScrollingFrame,
					ChildAdded: resizeScrollingFrame,
					ChildRemoved: resizeScrollingFrame,
				}}
			>
				<uigridlayout {...gridLayout} />

				{tree.branches.map((branch: Branch, branchIndex) => {
					const matchesBranchFilter = matchesFilter(branch.title);
					let hasMatchingLeaf = matchesBranchFilter;

					if (!hasMatchingLeaf) {
						for (const leaf of branch.leaves) {
							if (matchesFilter(leaf.title)) {
								hasMatchingLeaf = true;
								break;
							}
						}
					}

					if (matchesBranchFilter || hasMatchingLeaf) {
						return (
							<>
								<textbutton
									Key={`${branch.title}-${branchIndex}`}
									{...row}
									Event={{
										MouseButton1Click: () => {
											if (branch.onClick) {
												branch.onClick();
											}

											// If there are leaves... Expand/Collapse
											if (branch.leaves.size() > 0) {
												const isExpanded = expanded.includes(branch);
												if (isExpanded) {
													setExpanded((oldExpanded) =>
														oldExpanded.filter((b) => b !== branch),
													);
												} else {
													setExpanded((oldExpanded) => [...oldExpanded, branch]);
												}
											} else {
												setSelectedBranch(branch);
											}
										},
									}}
								>
									{branch.leaves.size() > 0 && (
										<Icon
											icon={expanded.includes(branch) ? Icons.Expanded : Icons.Collapsed}
											size={"xxs"}
											className={branchIcon}
											tint={DefaultTheme.options.constants.extendedPalette.Gray[70]}
										/>
									)}
									<Typography
										text={branch.title}
										className={{ ...branchTypography } as WriteableStyle<TextLabel>}
										color={"textPrimary"}
										variant={"body"}
										family={selectedBranch === branch ? "bold" : "default"}
									/>
								</textbutton>

								{expanded.includes(branch) &&
									branch.leaves.map((leaf: Leaf, leafIndex) => {
										const matchesLeafFilter = matchesFilter(leaf.title);
										if (matchesBranchFilter || matchesLeafFilter) {
											return (
												<textbutton
													Key={`${branch.title}-${branchIndex}-${leaf.title}-${leafIndex}`}
													{...row}
													Event={{
														MouseButton1Click: () => {
															setSelectedLeaf(leaf);
															setSelectedBranch(branch);

															if (leaf.onClick) {
																leaf.onClick();
															}
														},
													}}
												>
													<Icon
														icon={icon || Icons.ListPrimary}
														size={"xs"}
														className={leafIcon}
														tint={DefaultTheme.palette.secondary.main}
													/>
													<Typography
														text={leaf.title}
														className={{ ...leafTypography } as WriteableStyle<TextLabel>}
														color={"textPrimary"}
														variant={"body"}
														family={selectedLeaf === leaf ? "bold" : "default"}
													/>
												</textbutton>
											);
										} else {
											return <></>;
										}
									})}
							</>
						);
					} else {
						return <></>;
					}
				})}
			</scrollingframe>
		</frame>
	);
});

export default TreeView;
