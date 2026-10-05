import React from "@rbxts/react";
import usePaperStyles from "./Paper.styles";

export type PaperElevation = "flat" | "raised";

export interface PaperProps {
	elevation?: PaperElevation;
	square?: boolean;
	children?: React.ReactNode;
}

function Paper(props: PaperProps) {
	const { elevation = "flat", square, children } = props;
	const styles = usePaperStyles({ elevation });
	return (
		<frame key="Paper" {...styles.root}>
			<uipadding {...styles.padding} />
			{square !== true && <uicorner {...styles.corner} />}
			{children}
		</frame>
	);
}

export default Paper;
