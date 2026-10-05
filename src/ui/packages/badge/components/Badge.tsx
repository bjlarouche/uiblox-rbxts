import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { badgeText } from "./badgeValue";
import useBadgeStyles from "./Badge.styles";

export interface BadgeProps {
	count?: number;
	max?: number;
	invisible?: boolean;
	children?: React.ReactNode;
}

function Badge(props: CustomizedProps<Frame, BadgeProps>) {
	const { count = 0, max = 99, invisible = false, children, className, sx, id, ref } = props;
	const styles = useBadgeStyles();
	const shown = !invisible && count > 0;
	return (
		<frame key={id || "Badge"} ref={ref} {...styles.root} {...className} {...sx}>
			{children}
			{shown && (
				<textlabel key="Count" {...styles.badge} Text={badgeText(count, max)}>
					<uipadding {...styles.padding} />
					<uicorner {...styles.corner} />
				</textlabel>
			)}
		</frame>
	);
}

export default Badge;
