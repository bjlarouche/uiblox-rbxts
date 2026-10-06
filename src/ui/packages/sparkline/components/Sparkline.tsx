import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { sparklineLayout } from "../sparklineLayout";

export interface SparklineProps {
	values: number[];
	width?: number;
	height?: number;
	color?: Color3;
}

function Sparkline(props: CustomizedProps<Frame, SparklineProps>) {
	const { values, width = 120, height = 36, color, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const segments = sparklineLayout(values, width, height);
	const stroke = color ?? theme.palette.primary.main;

	return (
		<SxHost
			tag="frame"
			key={id || "Sparkline"}
			hostRef={ref}
			base={{
				Size: UDim2.fromOffset(width, height),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ClipsDescendants: true,
			}}
			className={className}
			sx={sx}
		>
			{segments.map((segment, index) => (
				<frame
					key={`s-${index}`}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromOffset(segment.x, segment.y)}
					Size={UDim2.fromOffset(segment.length, 2)}
					Rotation={segment.rotation}
					BackgroundColor3={stroke}
					BorderSizePixel={0}
				/>
			))}
		</SxHost>
	);
}

export default Sparkline;
