import React from "@rbxts/react";
import { CustomizedProps } from "theme";
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
		<frame key={id || "Container"} ref={ref} {...styles.root} {...className} {...sx}>
			<frame key="Inner" {...styles.inner}>
				<uisizeconstraint {...styles.constraint} />
				<uipadding {...styles.gutter} />
				{children}
			</frame>
		</frame>
	);
}

export default Container;
