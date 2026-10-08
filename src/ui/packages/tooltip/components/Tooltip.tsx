import React, { useEffect, useRef, useState } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { Popup } from "ui/packages/popup";
import useTooltipStyles from "./Tooltip.styles";
import { tooltipBox } from "./tooltipBox";
import { pointerInside } from "./tooltipPointer";

export interface TooltipProps {
	text: string;
	title?: string;
	delay?: number;
}

function Tooltip(props: CustomizedProps<Frame, TooltipProps>) {
	const { text, title, delay = 0.4, children, className,
		sx, id, ref } = props;
	const styles = useTooltipStyles();
	const { theme } = useTheme();
	const padX = theme.padding.calc(2);
	const padY = theme.padding.default;
	const textSize = theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body ?? 14;
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const heading = title ?? "";
	const limit = new Vector2(theme.spacing.calc(24), 10000);
	const textBounds = TextService.GetTextSize(text, textSize, font, limit);
	const titleFont = theme.typography.fontFamilies.semibold ?? font;
	const titleBounds = heading !== "" ? TextService.GetTextSize(heading, textSize, titleFont, limit) : undefined;
	const box = tooltipBox(textBounds.X, textBounds.Y, titleBounds?.X ?? 0, titleBounds?.Y ?? 0, padX, padY, heading !== "" ? padY : 0);
	const tipWidth = box.width;
	const tipHeight = box.height;
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
				MouseLeave: (rbx: Frame, x: number, y: number) => {
					if (pointerInside(rbx.AbsolutePosition.X, rbx.AbsolutePosition.Y, rbx.AbsoluteSize.X, rbx.AbsoluteSize.Y, x, y)) return;
					cancel();
					setShown(false);
				},
			}}
		>
			{children}
			{shown && (text !== "" || heading !== "") && (
				<Popup anchor={anchor} preferredWidth={tipWidth} preferredHeight={tipHeight}>
					{heading === "" ? (
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
					) : (
						<frame key="Tip" {...styles.shell}>
							<uipadding {...styles.padding} />
							<uicorner {...styles.corner} />
							<uistroke {...styles.stroke} />
							<uilistlayout {...styles.stack} />
							<textlabel key="Title" {...styles.title} Text={heading} LayoutOrder={0} />
							{text !== "" && <textlabel key="Body" {...styles.body} Text={text} LayoutOrder={1} />}
						</frame>
					)}
				</Popup>
			)}
		</SxHost>
	);
}

export default Tooltip;
