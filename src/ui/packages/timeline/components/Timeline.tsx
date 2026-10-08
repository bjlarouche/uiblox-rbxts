import React from "@rbxts/react";
import { CustomizedProps, cx } from "theme";
import { SxHost } from "ui/packages/host";
import useTimelineStyles from "./Timeline.styles";
import { timelineRail, timelineTone, TimelineTone } from "./timelineRail";

export interface TimelineItem {
	title: string;
	caption?: string;
	tone?: TimelineTone;
}

export interface TimelineProps {
	items: TimelineItem[];
}

function Timeline(props: CustomizedProps<Frame, TimelineProps>) {
	const { items, className, sx, id, ref } = props;
	const styles = useTimelineStyles();
	const count = items.size();
	return (
		<SxHost tag="frame" key={id || "Timeline"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} />
			<>
				{items.map((item, index) => {
					const tone = timelineTone(item.tone);
					const mark =
						tone === "done" ? styles.done : tone === "active" ? styles.active : tone === "error" ? styles.error : styles.pending;
					const caption = item.caption;
					return (
						<frame key={`${item.title}-${index}`} {...styles.item} LayoutOrder={index}>
							<uilistlayout {...styles.row} />
							<frame {...styles.rail}>
								{timelineRail(index, count) ? <frame {...styles.line} /> : undefined}
								<frame {...cx(styles.dot, mark)}>
									<uicorner CornerRadius={new UDim(1, 0)} />
								</frame>
							</frame>
							<frame {...styles.body}>
								<uipadding {...styles.bodyPad} />
								<uilistlayout {...styles.bodyList} />
								<textlabel {...styles.title} Text={item.title} LayoutOrder={0} />
								{caption !== undefined && caption.size() > 0 ? (
									<textlabel {...styles.caption} Text={caption} LayoutOrder={1} />
								) : undefined}
							</frame>
						</frame>
					);
				})}
			</>
		</SxHost>
	);
}

export default Timeline;
