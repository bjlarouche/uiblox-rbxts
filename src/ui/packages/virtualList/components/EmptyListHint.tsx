import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import useEmptyListHintStyles from "./EmptyListHint.styles";

export interface EmptyListHintProps {
	text: string;
	height?: number;
}

function EmptyListHint(props: CustomizedProps<TextLabel, EmptyListHintProps>) {
	const { text, height, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useEmptyListHintStyles({ height: height ?? theme.spacing.calc(4) });
	return (
		<SxHost
			tag="textlabel"
			key={id || "EmptyListHint"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			Text={text}
		/>
	);
}

export default EmptyListHint;
