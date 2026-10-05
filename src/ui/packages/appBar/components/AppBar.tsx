import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Shadow } from "ui/packages/shadow";
import useAppBarStyles, { AppBarElevation } from "./AppBar.styles";

export interface AppBarProps {
	title?: string;
	elevation?: AppBarElevation;
	children?: React.ReactNode;
}

function AppBar(props: CustomizedProps<Frame, AppBarProps>) {
	const { title = "", elevation = "raised", children, className, sx, id, ref } = props;
	const styles = useAppBarStyles({ elevation, hasActions: children !== undefined });
	return (
		<frame key={id || "AppBar"} ref={ref} {...styles.root} {...className} {...sx}>
			<uipadding {...styles.padding} />
			{elevation === "raised" && <Shadow />}
			{title !== "" && <textlabel key="Title" {...styles.title} Text={title} />}
			{children !== undefined && (
				<frame key="Actions" {...styles.actions}>
					<uilistlayout {...styles.actionsLayout} />
					{children}
				</frame>
			)}
		</frame>
	);
}

export default AppBar;
