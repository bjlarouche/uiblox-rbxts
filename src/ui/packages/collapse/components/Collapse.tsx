import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { collapseOpen } from "./collapseOpen";
import useCollapseStyles from "./Collapse.styles";

export interface CollapseProps {
	open?: boolean;
	children?: React.ReactNode;
}

function Collapse(props: CustomizedProps<Frame, CollapseProps>) {
	const { open, children, className, sx, id, ref } = props;
	const styles = useCollapseStyles();
	return (
		<SxHost
			tag="frame"
			key={id || "Collapse"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			Visible={collapseOpen(open)}
		>
			{children}
		</SxHost>
	);
}

export default Collapse;
