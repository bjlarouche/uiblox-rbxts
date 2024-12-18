import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import useSidebarStyles from "./Sidebar.styles";

export type DefaultSidebarComponent = Frame;

export interface SidebarProps {
	size: "compact" | "large";
	ignoreInset?: boolean;
}

function Sidebar<T extends DefaultSidebarComponent>(props: CustomizedProps<T, SidebarProps>) {
	const { className, children, id, ref } = props;
	const { root, container } = useSidebarStyles(props);

	return (
		<frame key={id || "Sidebar"} ref={ref as React.Ref<Frame>} {...root} {...className}>
			<frame key="Container" {...container}>
				{children}
			</frame>
		</frame>
	);
}

export default Sidebar;
