import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { FlexItemAlign } from "./flexItemMode";
import useFlexItemStyles from "./FlexItem.styles";

export interface FlexItemProps {
	grow?: number;
	shrink?: number;
	fill?: boolean;
	alignSelf?: FlexItemAlign;
	children?: React.ReactNode;
}

function FlexItem(props: CustomizedProps<Frame, FlexItemProps>) {
	const { grow, shrink, fill, alignSelf, children, className, sx, id, ref } = props;
	const styles = useFlexItemStyles({ grow, shrink, fill, alignSelf });
	return (
		<SxHost key={id || "FlexItem"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uiflexitem {...styles.flex} />
			{children}
		</SxHost>
	);
}

export default FlexItem;
