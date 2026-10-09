import React from "@rbxts/react";
import { CustomizedProps, resolveSx, SxInput, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";

export interface ScrollViewProps {
	children?: React.ReactNode;
}

function isPadKey(key: string) {
	return (
		key === "p" ||
		key === "px" ||
		key === "py" ||
		key === "pt" ||
		key === "pr" ||
		key === "pb" ||
		key === "pl" ||
		key === "padding"
	);
}

/** Padding on a scrolling frame offsets scale-sized children without shrinking them. */
function withoutPad(sx: object | undefined) {
	if (sx === undefined) return undefined;
	const rest: { [key: string]: unknown } = {};
	let kept = false;
	for (const [key, value] of pairs(sx as { [key: string]: unknown })) {
		const name = tostring(key);
		if (isPadKey(name)) continue;
		rest[name] = value;
		kept = true;
	}
	return kept ? rest : undefined;
}

function ScrollView(props: CustomizedProps<ScrollingFrame, ScrollViewProps>) {
	const { children, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const root: WriteableStyle<ScrollingFrame> = {
		Size: UDim2.fromScale(1, 1),
		BackgroundTransparency: 1,
		BorderSizePixel: 0,
		CanvasSize: UDim2.fromScale(0, 0),
		AutomaticCanvasSize: Enum.AutomaticSize.Y,
		ScrollingDirection: Enum.ScrollingDirection.Y,
		ScrollBarThickness: theme.spacing.calc(0.5),
		ScrollBarImageColor3: theme.palette.text.secondary,
	};
	const pad = resolveSx(theme, sx as SxInput | undefined).padding;
	const left = pad?.PaddingLeft.Offset ?? 0;
	const right = pad?.PaddingRight.Offset ?? 0;
	const top = pad?.PaddingTop.Offset ?? 0;
	const bottom = pad?.PaddingBottom.Offset ?? 0;
	const inset = left + right + top + bottom > 0;

	return (
		<SxHost tag="scrollingframe" key={id || "ScrollView"} hostRef={ref} base={root} className={className} sx={withoutPad(sx)}>
			{inset ? (
				<frame
					key="Pad"
					Size={new UDim2(1, -(left + right), 0, 0)}
					Position={new UDim2(0, left, 0, top)}
					AutomaticSize={Enum.AutomaticSize.Y}
					BackgroundTransparency={1}
					BorderSizePixel={0}
				>
					<uipadding PaddingBottom={new UDim(0, bottom)} />
					{children}
				</frame>
			) : (
				children
			)}
		</SxHost>
	);
}

export default ScrollView;
