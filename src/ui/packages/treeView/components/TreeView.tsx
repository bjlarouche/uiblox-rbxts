import Roact from "@rbxts/roact";
import { hooked, useState } from "@rbxts/roact-hooked";
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
}

const TreeView = hooked<CustomizedProps<DefaultTreeViewComponent, TreeViewProps>>((props) => {
	const { tree, icon, className } = props;
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
												setExpanded((oldExpanded) => oldExpanded.filter((b) => b !== branch));
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
										tint={DefaultTheme.options.constants.extendedPalette.Gray[50]}
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
								})}
						</>
					);
				})}
			</scrollingframe>
		</frame>
	);
});

export default TreeView;
