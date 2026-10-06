import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Shadow } from "ui/packages/shadow";
import { SxHost } from "ui/packages/host";
import useAppBarStyles, { AppBarColor, AppBarElevation } from "./AppBar.styles";

export interface AppBarProps {
	title?: string;
	elevation?: AppBarElevation;
	color?: AppBarColor;
	children?: React.ReactNode;
}

function AppBar(props: CustomizedProps<Frame, AppBarProps>) {
	const { title = "", elevation = "raised", color = "default", children, className, sx, id, ref } = props;
	const styles = useAppBarStyles({ elevation, color, hasActions: children !== undefined });
	return (
		<SxHost tag="frame" key={id || "AppBar"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uipadding {...styles.padding} />
			{elevation === "raised" && <Shadow />}
			{title !== "" && <textlabel key="Title" {...styles.title} Text={title} />}
			{children !== undefined && (
				<frame key="Actions" {...styles.actions}>
					<uilistlayout {...styles.actionsLayout} />
					{children}
				</frame>
			)}
		</SxHost>
	);
}

export default AppBar;
