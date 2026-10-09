import React from "@rbxts/react";
import { CustomizedProps, resolveSx, SxInput, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { BoxPad, boxPadSides } from "./boxPad";
import useBoxStyles, { BoxBg } from "./Box.styles";
import { automaticAxes, Pad, padActive, styleAutomaticSize, withoutPad } from "./Pad";

export interface BoxProps {
	padding?: BoxPad;
	bgcolor?: BoxBg;
	children?: React.ReactNode;
}

function padPixels(
	themePad: (step: number) => number,
	padding: BoxPad | undefined,
	resolved: { PaddingLeft: UDim; PaddingRight: UDim; PaddingTop: UDim; PaddingBottom: UDim } | undefined,
) {
	const sides = boxPadSides(padding);
	if (sides.top + sides.right + sides.bottom + sides.left > 0) {
		return {
			left: themePad(sides.left),
			right: themePad(sides.right),
			top: themePad(sides.top),
			bottom: themePad(sides.bottom),
		};
	}
	return {
		left: resolved?.PaddingLeft.Offset ?? 0,
		right: resolved?.PaddingRight.Offset ?? 0,
		top: resolved?.PaddingTop.Offset ?? 0,
		bottom: resolved?.PaddingBottom.Offset ?? 0,
	};
}

function Box(props: CustomizedProps<Frame, BoxProps>) {
	const { padding, bgcolor, children, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useBoxStyles({ bgcolor });
	const resolved = resolveSx(theme, sx as SxInput | undefined).padding;
	const edges = padPixels((step) => theme.spacing.calc(step), padding, resolved);
	const inset = padActive(edges.left, edges.right, edges.top, edges.bottom);
	const auto = automaticAxes(
		(sx as { AutomaticSize?: Enum.AutomaticSize } | undefined)?.AutomaticSize ?? styleAutomaticSize(styles.root),
	);
	return (
		<SxHost key={id || "Box"} hostRef={ref} base={styles.root} className={className} sx={inset ? withoutPad(sx) : sx}>
			{inset ? (
				<Pad left={edges.left} right={edges.right} top={edges.top} bottom={edges.bottom} autoX={auto.x} autoY={auto.y}>
					{children}
				</Pad>
			) : (
				children
			)}
		</SxHost>
	);
}

export default Box;
