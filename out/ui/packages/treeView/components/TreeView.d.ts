/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
import { Icons } from "../../../enums";
import Tree from "../interfaces/Tree";
type DefaultTreeViewComponent = Frame;
export interface TreeViewProps {
    tree: Tree;
    icon?: Icons;
    filter?: string;
}
declare function TreeView(props: CustomizedProps<DefaultTreeViewComponent, TreeViewProps>): Roact.Element;
declare const _default: typeof TreeView;
export default _default;
