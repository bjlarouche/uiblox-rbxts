import React, { useEffect, useRef, useState } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { Popup } from "ui/packages/popup";
import useTooltipStyles from "./Tooltip.styles";

export interface TooltipProps {
	text: string;
	delay?: number;
}

function Tooltip(props: CustomizedProps<Frame, TooltipProps>) {
	const { text, delay = 0.4, children, className,
		sx, id, ref } = props;
	const styles = useTooltipStyles();
	const { theme } = useTheme();
	const padX = theme.padding.calc(2);
	const padY = theme.padding.default;
	const textSize = theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body ?? 14;
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textBounds = TextService.GetTextSize(text, textSize, font, new Vector2(theme.spacing.calc(24), 10000));
	const tipWidth = textBounds.X + padX * 2;
	const tipHeight = textBounds.Y + padY * 2;
	const [anchor, setAnchor] = useState<Frame>();
	const [shown, setShown] = useState(false);
	const pending = useRef<thread>();

	const cancel = () => {
		if (pending.current) task.cancel(pending.current);
		pending.current = undefined;
	};

	useEffect(() => cancel, []);

	return (
		<SxHost
			tag="frame"
			key={id || "Tooltip"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			Event={{
				MouseEnter: (rbx: Frame) => {
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
				<Popup anchor={anchor} preferredWidth={tipWidth} preferredHeight={tipHeight}>
					<textlabel
						key="Tip"
						{...styles.label}
						Text={text}
						Size={UDim2.fromScale(1, 1)}
						AutomaticSize={Enum.AutomaticSize.None}
						TextWrapped={true}
					>
						<uipadding {...styles.padding} />
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
					</textlabel>
				</Popup>
			)}
		</SxHost>
	);
}

export default Tooltip;
