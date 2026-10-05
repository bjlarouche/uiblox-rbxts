import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { badgeText } from "./badgeValue";
import useBadgeStyles from "./Badge.styles";

export interface BadgeProps {
	count?: number;
	max?: number;
	invisible?: boolean;
	variant?: "standard" | "dot";
	children?: React.ReactNode;
}

function Badge(props: CustomizedProps<Frame, BadgeProps>) {
	const { count = 0, max = 99, invisible = false, variant = "standard", children, className, sx, id, ref } = props;
	const styles = useBadgeStyles({ variant });
	const isDot = variant === "dot";
	const shown = !invisible && (isDot || count > 0);
	return (
		<frame key={id || "Badge"} ref={ref} {...styles.root} {...className} {...sx}>
			{children}
			{shown && (
				<textlabel key="Count" {...styles.badge} Text={isDot ? "" : badgeText(count, max)}>
					{isDot !== true && <uipadding {...styles.padding} />}
					<uicorner {...styles.corner} />
				</textlabel>
			)}
		</frame>
	);
}

export default Badge;
