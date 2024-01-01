/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
export type DefaultSidebarComponent = Frame;
export interface SidebarProps {
    size: "compact" | "large";
    ignoreInset?: boolean;
}
declare function Sidebar<T extends DefaultSidebarComponent>(props: CustomizedProps<T, SidebarProps>): Roact.Element;
export default Sidebar;
