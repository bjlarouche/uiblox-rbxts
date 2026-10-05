import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { StackAlign, StackDirection, StackJustify } from "./stackAlign";
import useStackStyles from "./Stack.styles";

export interface StackProps {
	direction?: StackDirection;
	spacing?: number;
	gap?: number;
	wrap?: boolean;
	alignItems?: StackAlign;
	justifyContent?: StackJustify;
	children?: React.ReactNode;
}

function Stack(props: CustomizedProps<Frame, StackProps>) {
	const { direction, spacing, gap, wrap, alignItems, justifyContent, children, className, sx, id, ref } = props;
	const styles = useStackStyles({ direction, spacing, gap, wrap, alignItems, justifyContent });
	return (
		<frame key={id || "Stack"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{children}
		</frame>
	);
}

export default Stack;
