import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import usePaperStyles from "./Paper.styles";

export type PaperElevation = "flat" | "raised" | "outlined";

export interface PaperProps {
	elevation?: PaperElevation;
	square?: boolean;
	children?: React.ReactNode;
}

function Paper(props: CustomizedProps<Frame, PaperProps>) {
	const { elevation = "flat", square, children, className, sx, id, ref } = props;
	const styles = usePaperStyles({ elevation });
	return (
		<SxHost key={id || "Paper"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uipadding {...styles.padding} />
			{square !== true && <uicorner {...styles.corner} />}
			{elevation === "outlined" && <uistroke {...styles.stroke} />}
			{children}
		</SxHost>
	);
}

export default Paper;
