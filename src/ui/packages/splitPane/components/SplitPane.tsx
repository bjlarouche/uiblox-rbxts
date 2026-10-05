import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useSplitPaneStyles from "./SplitPane.styles";
import { splitHitTransparency, splitMarkTransparency, splitPointer, splitRuleTransparency } from "./splitLook";
import { clampSplit, splitBoxDims, splitRuleDims, toUDim2 } from "./splitSize";

export interface SplitPaneProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	vertical?: boolean;
	disabled?: boolean;
	first?: React.ReactNode;
	second?: React.ReactNode;
}

function SplitPane(props: CustomizedProps<Frame, SplitPaneProps>) {
	const { value, onChange, min, max, vertical = false, disabled, first, second, className, id, ref } = props;
	const styles = useSplitPaneStyles();
	const { theme } = useTheme();
	const thickness = theme.padding.calc(3);
	const active = canActivate(disabled);
	const [body, setBody] = useState<Frame>();
	const [total, setTotal] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [hovering, setHovering] = useState(false);
	const start = useRef(value);
	const axis = (vector: Vector2 | Vector3) => (vertical ? vector.Y : vector.X);
	const size = clampSplit(value, total - thickness, min, max);
	const at = (offset: number) => (vertical ? UDim2.fromOffset(0, offset) : UDim2.fromOffset(offset, 0));
	const along = (offset: number, scale = 0) =>
		vertical ? new UDim2(1, 0, scale, offset) : new UDim2(scale, offset, 1, 0);
	const pointer = splitPointer(hovering, dragging);
	const markTransparency = splitMarkTransparency(pointer, disabled);
	const ruleTransparency = splitRuleTransparency(pointer, disabled);
	const markLen = theme.spacing.calc(2) + theme.padding.default;
	const markGap = theme.padding.default / 2;
	const markThick = theme.options.constants.borders.divider;
	const ruleThick = theme.options.constants.borders.default;
	const gripAcross = markThick * 3 + markGap * 2;

	useEffect(() => {
		if (!body) return;
		const measure = () => setTotal(axis(body.AbsoluteSize));
		measure();
		const connection = body.GetPropertyChangedSignal("AbsoluteSize").Connect(measure);
		return () => connection.Disconnect();
	}, [body, vertical]);

	return (
		<frame key={id || "SplitPane"} ref={ref} {...styles.root} {...className}>
			<frame key="Body" ref={setBody} {...styles.body}>
				<frame key="First" {...styles.pane} Size={along(size)}>
					{first}
				</frame>
				<frame
					key="Divider"
					{...styles.divider}
					Position={at(size)}
					Size={along(thickness)}
					BackgroundTransparency={splitHitTransparency(pointer, disabled)}
					Active={active}
					Event={{
						InputBegan: (_, input) => {
							if (!active || input.UserInputType !== Enum.UserInputType.MouseButton1) return;
							start.current = size;
							setDragging(true);
						},
						MouseEnter: () => {
							if (active) setHovering(true);
						},
						MouseLeave: () => setHovering(false),
					}}
				>
					<frame
						key="Rule"
						{...styles.rule}
						Size={toUDim2(splitRuleDims(vertical, ruleThick))}
						BackgroundTransparency={ruleTransparency}
					/>
					<frame key="Grip" {...styles.grip} Size={toUDim2(splitBoxDims(vertical, markLen, gripAcross))}>
						<uilistlayout
							key="GripLayout"
							FillDirection={vertical ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal}
							HorizontalAlignment={Enum.HorizontalAlignment.Center}
							VerticalAlignment={Enum.VerticalAlignment.Center}
							Padding={new UDim(0, markGap)}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>
						{[1, 2, 3].map((index) => (
							<frame
								key={`Mark${index}`}
								{...styles.mark}
								LayoutOrder={index}
								Size={toUDim2(splitBoxDims(vertical, markLen, markThick))}
								BackgroundTransparency={markTransparency}
							/>
						))}
					</frame>
				</frame>
				<frame key="Second" {...styles.pane} Position={at(size + thickness)} Size={along(-size - thickness, 1)}>
					{second}
				</frame>
				{dragging && active && (
					<frame
						key="Overlay"
						{...styles.overlay}
						Event={{
							InputChanged: (rbx, input) => {
								if (input.UserInputType !== Enum.UserInputType.MouseMovement) return;
								const alongPointer = axis(input.Position) - axis(rbx.AbsolutePosition) - thickness / 2;
								const resized = clampSplit(alongPointer, total - thickness, min, max);
								if (resized !== value) onChange(resized);
							},
							InputBegan: (_, input) => {
								if (input.KeyCode !== Enum.KeyCode.Escape) return;
								setDragging(false);
								if (start.current !== value) onChange(start.current);
							},
							InputEnded: (_, input) => {
								if (input.UserInputType === Enum.UserInputType.MouseButton1) setDragging(false);
							},
							MouseLeave: () => setDragging(false),
						}}
					/>
				)}
			</frame>
		</frame>
	);
}

export default SplitPane;
