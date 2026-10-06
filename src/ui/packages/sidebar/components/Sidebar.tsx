import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import useSidebarStyles from "./Sidebar.styles";

export type DefaultSidebarComponent = Frame;

export interface SidebarProps {
	size: "compact" | "large";
	ignoreInset?: boolean;
}

function Sidebar<T extends DefaultSidebarComponent>(props: CustomizedProps<T, SidebarProps>) {
	const { className,
		sx, children, id, ref } = props;
	const { root, container } = useSidebarStyles(props);

	return (
		<SxHost tag="frame" key={id || "Sidebar"} hostRef={ref} base={root} className={className} sx={sx}>
			<frame key="Container" {...container}>
				{children}
			</frame>
		</SxHost>
	);
}

export default Sidebar;
