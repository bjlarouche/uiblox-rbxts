import React, { useEffect, useRef, useState } from "@rbxts/react";
import { cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useSplitPaneStyles from "./SplitPane.styles";
import { clampSplit } from "./splitSize";

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
	const thickness = theme.padding.default;
	const active = canActivate(disabled);
	const [body, setBody] = useState<Frame>();
	const [total, setTotal] = useState(0);
	const [dragging, setDragging] = useState(false);
	const start = useRef(value);
	const axis = (vector: Vector2 | Vector3) => (vertical ? vector.Y : vector.X);
	const size = clampSplit(value, total - thickness, min, max);
	const at = (offset: number) => (vertical ? UDim2.fromOffset(0, offset) : UDim2.fromOffset(offset, 0));
	const along = (offset: number, scale = 0) =>
		vertical ? new UDim2(1, 0, scale, offset) : new UDim2(scale, offset, 1, 0);

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
					{...cx<Frame>(styles.divider, dragging && styles.dragging)}
					Position={at(size)}
					Size={along(thickness)}
					Event={{
						InputBegan: (_, input) => {
							if (!active || input.UserInputType !== Enum.UserInputType.MouseButton1) return;
							start.current = size;
							setDragging(true);
						},
					}}
				/>
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
								const pointer = axis(input.Position) - axis(rbx.AbsolutePosition) - thickness / 2;
								const resized = clampSplit(pointer, total - thickness, min, max);
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
