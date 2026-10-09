import React, { useEffect, useRef, useState } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, useTheme } from "theme";
import { Orientations } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { dividerFit, dividerLabel } from "./dividerLabel";
import useDividerStyles from "./Divider.styles";

type DefaultDividerComponent = Frame;

export interface DividerProps {
	position?: UDim2;
	orientation?: Orientations;
	padding?: number;
	color?: Color3;
	transparency?: number;
	weight?: number;
	anchorPoint?: Vector2;
	text?: string;
}

function Divider<T extends DefaultDividerComponent>(props: CustomizedProps<T, DividerProps>) {
	const { text, orientation, className, sx, id, ref } = props;

	const { root, shell, line, caption, captionPad } = useDividerStyles(props);
	const { theme } = useTheme();
	const label = dividerLabel(text);
	const labeled = label !== undefined && orientation !== Orientations.Vertical;
	const shellRef = useRef<Frame>();
	const [box, setBox] = useState(0);
	const textSize = theme.typography.fontSizes.caption ?? 12;
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const measured = labeled ? TextService.GetTextSize(label, textSize, font, new Vector2(10000, 100)).X : 0;
	const room = math.max(0, box - theme.padding.calc(2) * 2);
	const fit = labeled ? dividerFit(measured + theme.padding.calc(1) * 2, room) : 0;

	useEffect(() => {
		const rbx = shellRef.current;
		if (!rbx) return;
		const update = () => setBox(rbx.AbsoluteSize.X);
		update();
		const connection = rbx.GetPropertyChangedSignal("AbsoluteSize").Connect(update);
		return () => connection.Disconnect();
	});

	if (labeled) {
		return (
			<SxHost
				tag="frame"
				key={id || "Divider"}
				hostRef={(instance: Frame) => {
					shellRef.current = instance;
					if (typeIs(ref, "function")) (ref as (value: Frame | undefined) => void)(instance);
					else if (ref !== undefined) (ref as { current?: Frame }).current = instance;
				}}
				base={shell}
				className={className}
				sx={sx}
			>
				<frame key="Line" {...line} />
				<textlabel
					key="Label"
					{...caption}
					Text={label}
					Size={fit > 0 ? new UDim2(0, fit, 1, 0) : new UDim2(0, 0, 1, 0)}
					AutomaticSize={fit > 0 ? Enum.AutomaticSize.None : Enum.AutomaticSize.X}
				>
					<uipadding {...captionPad} />
					{room > 0 ? <uisizeconstraint MaxSize={new Vector2(room, math.huge)} /> : undefined}
				</textlabel>
			</SxHost>
		);
	}

	return (
		<SxHost
			tag="frame"
			key={id || "Divider"}
			hostRef={ref}
			base={{ ...root, BorderSizePixel: 0 }}
			className={className}
			sx={sx}
		/>
	);
}

export default Divider;
