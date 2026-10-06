import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Paper, PaperElevation } from "ui/packages/paper";
import useCardStyles from "./Card.styles";

export interface CardProps {
	title?: string;
	subtitle?: string;
	elevation?: PaperElevation;
	square?: boolean;
	actions?: React.ReactNode;
	children?: React.ReactNode;
}

function Card(props: CustomizedProps<Frame, CardProps>) {
	const { title, subtitle, elevation = "flat", square, actions, children, className, sx, id, ref } = props;
	const styles = useCardStyles();
	return (
		<Paper elevation={elevation} square={square} className={className} sx={sx} id={id} ref={ref}>
			<frame key="Column" {...styles.column}>
				<uilistlayout {...styles.list} />
				{title !== undefined && (
					<textlabel key="Title" {...styles.title} Text={title} />
				)}
				{subtitle !== undefined && (
					<textlabel key="Subtitle" {...styles.subtitle} Text={subtitle} />
				)}
				<frame key="Body" {...styles.body}>
					{children}
				</frame>
				{actions !== undefined && (
					<frame key="Actions" {...styles.actions}>
						<uilistlayout {...styles.actionList} />
						{actions}
					</frame>
				)}
			</frame>
		</Paper>
	);
}

export default Card;
