import React from "@rbxts/react";
import { CustomizedProps } from "theme";
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
		<frame key={id || "FlexItem"} ref={ref} {...styles.root} {...className} {...sx}>
			<uiflexitem {...styles.flex} />
			{children}
		</frame>
	);
}

export default FlexItem;
