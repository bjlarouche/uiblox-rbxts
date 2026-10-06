import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { sparklineArea, sparklineLayout } from "../sparklineLayout";

export interface SparklineProps {
	values: number[];
	width?: number;
	height?: number;
	color?: Color3;
	area?: boolean;
}

function Sparkline(props: CustomizedProps<Frame, SparklineProps>) {
	const { values, width = 120, height = 36, color, area, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const segments = sparklineLayout(values, width, height);
	const bars = area === true ? sparklineArea(values, width, height) : [];
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
			{bars.map((bar, index) =>
				bar.height < 1 ? undefined : (
					<frame
						key={`a-${index}`}
						Position={UDim2.fromOffset(bar.x, bar.y)}
						Size={UDim2.fromOffset(math.max(bar.width, 1), bar.height)}
						BackgroundColor3={stroke}
						BackgroundTransparency={0.62}
						BorderSizePixel={0}
					/>
				),
			)}
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
