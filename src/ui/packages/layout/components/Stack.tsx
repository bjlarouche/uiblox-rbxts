import React from "@rbxts/react";
import { CustomizedProps, resolveSx, SxInput, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { automaticAxes, Pad, padActive, styleAutomaticSize, withoutPad } from "./Pad";
import { StackAlign, StackDirection, StackJustify } from "./stackAlign";
import useStackStyles from "./Stack.styles";

export interface StackProps {
	direction?: StackDirection;
	spacing?: number;
	gap?: number;
	wrap?: boolean;
	alignItems?: StackAlign;
	justifyContent?: StackJustify;
	children?: React.ReactNode;
}

function Stack(props: CustomizedProps<Frame, StackProps>) {
	const { direction, spacing, gap, wrap, alignItems, justifyContent, children, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useStackStyles({ direction, spacing, gap, wrap, alignItems, justifyContent });
	const pad = resolveSx(theme, sx as SxInput | undefined).padding;
	const left = pad?.PaddingLeft.Offset ?? 0;
	const right = pad?.PaddingRight.Offset ?? 0;
	const top = pad?.PaddingTop.Offset ?? 0;
	const bottom = pad?.PaddingBottom.Offset ?? 0;
	const inset = padActive(left, right, top, bottom);
	const auto = automaticAxes(
		(sx as { AutomaticSize?: Enum.AutomaticSize } | undefined)?.AutomaticSize ?? styleAutomaticSize(styles.root),
	);
	const body = (
		<>
			<uilistlayout {...styles.list} />
			{children}
		</>
	);
	return (
		<SxHost key={id || "Stack"} hostRef={ref} base={styles.root} className={className} sx={inset ? withoutPad(sx) : sx}>
			{inset ? (
				<Pad left={left} right={right} top={top} bottom={bottom} autoX={auto.x} autoY={auto.y}>
					{body}
				</Pad>
			) : (
				body
			)}
		</SxHost>
	);
}

export default Stack;
