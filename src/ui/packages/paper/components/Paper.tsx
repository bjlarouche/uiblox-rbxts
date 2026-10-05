import React from "@rbxts/react";
import usePaperStyles from "./Paper.styles";

export type PaperElevation = "flat" | "raised";

export interface PaperProps {
	elevation?: PaperElevation;
	children?: React.ReactNode;
}

function Paper(props: PaperProps) {
	const { elevation = "flat", children } = props;
	const styles = usePaperStyles({ elevation });
	return (
		<frame key="Paper" {...styles.root}>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			{children}
		</frame>
	);
}

export default Paper;
