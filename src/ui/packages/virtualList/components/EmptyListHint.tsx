import React from "@rbxts/react";
import { useTheme } from "theme";
import useEmptyListHintStyles from "./EmptyListHint.styles";

export interface EmptyListHintProps {
	text: string;
	height?: number;
}

function EmptyListHint(props: EmptyListHintProps) {
	const { text, height } = props;
	const { theme } = useTheme();
	const styles = useEmptyListHintStyles({ height: height ?? theme.spacing.calc(4) });
	return <textlabel key="EmptyListHint" {...styles.root} Text={text} />;
}

export default EmptyListHint;
