import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Popup } from "ui/packages/popup";
import useTooltipStyles from "./Tooltip.styles";

export interface TooltipProps {
	text: string;
	delay?: number;
}

function Tooltip(props: CustomizedProps<Frame, TooltipProps>) {
	const { text, delay = 0.4, children, className, id, ref } = props;
	const styles = useTooltipStyles();
	const [anchor, setAnchor] = useState<Frame>();
	const [shown, setShown] = useState(false);
	const pending = useRef<thread>();

	const cancel = () => {
		if (pending.current) task.cancel(pending.current);
		pending.current = undefined;
	};

	useEffect(() => cancel, []);

	return (
		<frame
			key={id || "Tooltip"}
			ref={ref}
			{...styles.root}
			{...className}
			Event={{
				MouseEnter: (rbx) => {
					setAnchor(rbx);
					cancel();
					pending.current = task.delay(delay, () => {
						pending.current = undefined;
						setShown(true);
					});
				},
				MouseLeave: () => {
					cancel();
					setShown(false);
				},
			}}
		>
			{children}
			{shown && text !== "" && (
				<Popup anchor={anchor}>
					<textlabel key="Tip" {...styles.label} Text={text}>
						<uipadding {...styles.padding} />
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
					</textlabel>
				</Popup>
			)}
		</frame>
	);
}

export default Tooltip;
