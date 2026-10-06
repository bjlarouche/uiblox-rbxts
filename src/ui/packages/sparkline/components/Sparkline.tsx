import React, { useRef } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { sparklineArea, sparklineLayout, sparklinePick, sparklinePoint } from "../sparklineLayout";

export interface SparklineProps {
	values: number[];
	width?: number;
	height?: number;
	color?: Color3;
	area?: boolean;
	mark?: number;
	onPick?: (index: number) => void;
}

function Sparkline(props: CustomizedProps<Frame, SparklineProps>) {
	const { values, width = 120, height = 36, color, area, mark, onPick, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const host = useRef<Frame>();
	const segments = sparklineLayout(values, width, height);
	const bars = area === true ? sparklineArea(values, width, height) : [];
	const marked = mark !== undefined ? sparklinePoint(values, mark, width, height) : undefined;
	const stroke = color ?? theme.palette.primary.main;

	return (
		<SxHost
			tag="frame"
			key={id || "Sparkline"}
			hostRef={(instance: Frame | undefined) => {
				host.current = instance;
				if (ref === undefined) return;
				if (typeIs(ref, "function")) {
					ref(instance as Frame);
					return;
				}
				(ref as { current?: Frame }).current = instance;
			}}
			Active={onPick !== undefined}
			Event={
				onPick === undefined
					? undefined
					: {
							InputBegan: (input: InputObject) => {
								const frame = host.current;
								if (frame === undefined) return;
								if (
									input.UserInputType !== Enum.UserInputType.MouseButton1 &&
									input.UserInputType !== Enum.UserInputType.Touch
								) {
									return;
								}
								sparklinePick(input.Position.X - frame.AbsolutePosition.X, values.size(), width, onPick);
							},
						}
			}
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
			{marked !== undefined ? (
				<frame
					key="Mark"
					AnchorPoint={new Vector2(0.5, 0.5)}
					Position={UDim2.fromOffset(marked.x, marked.y)}
					Size={UDim2.fromOffset(8, 8)}
					BackgroundColor3={stroke}
					BorderSizePixel={0}
					ZIndex={3}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
				</frame>
			) : undefined}
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
