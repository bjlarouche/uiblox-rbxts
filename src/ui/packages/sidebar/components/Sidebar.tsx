import Roact from "@rbxts/roact";
import { CustomizedProps } from "theme";
import useSidebarStyles from "./Sidebar.styles";

export type DefaultSidebarComponent = Frame;

export interface SidebarProps {
	size: "compact" | "large";
	ignoreInset?: boolean;
}

function Sidebar<T extends DefaultSidebarComponent>(props: CustomizedProps<T, SidebarProps>) {
	const { className, children } = props;
	const { root, container } = useSidebarStyles(props);

	return (
		<frame Key="Sidebar" {...root} {...className}>
			<frame Key="Container" {...container}>
				{children}
			</frame>
		</frame>
	);
}

export default Sidebar;
