import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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
		<SxHost key={id || "Stack"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} />
			{children}
		</SxHost>
	);
}

export default Stack;
