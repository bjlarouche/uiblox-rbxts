import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { ContainerMaxWidth } from "./containerWidth";
import useContainerStyles from "./Container.styles";

export interface ContainerProps {
	maxWidth?: ContainerMaxWidth;
	disableGutters?: boolean;
	children?: React.ReactNode;
}

function Container(props: CustomizedProps<Frame, ContainerProps>) {
	const { maxWidth, disableGutters, children, className, sx, id, ref } = props;
	const styles = useContainerStyles({ maxWidth, disableGutters });
	return (
		<SxHost key={id || "Container"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<frame key="Inner" {...styles.inner}>
				<uisizeconstraint {...styles.constraint} />
				<uipadding {...styles.gutter} />
				{children}
			</frame>
		</SxHost>
	);
}

export default Container;
