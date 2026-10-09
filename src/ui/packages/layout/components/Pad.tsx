import React from "@rbxts/react";

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

/** Padding on the host offsets scale-sized children without shrinking them. */
export function withoutPad(sx: object | undefined) {
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

export function styleAutomaticSize(style: object) {
	return (style as { AutomaticSize?: Enum.AutomaticSize }).AutomaticSize;
}

export function automaticAxes(value: Enum.AutomaticSize | undefined) {
	if (value === Enum.AutomaticSize.X) return { x: true, y: false };
	if (value === Enum.AutomaticSize.Y) return { x: false, y: true };
	if (value === Enum.AutomaticSize.XY) return { x: true, y: true };
	return { x: false, y: false };
}

export function padActive(left: number, right: number, top: number, bottom: number) {
	return left + right + top + bottom > 0;
}

/**
 * Fixed axes use a shrunk size so scale children stop at the padding.
 * Automatic axes keep trailing padding on the content instead.
 */
export function Pad(props: {
	left: number;
	right: number;
	top: number;
	bottom: number;
	autoX: boolean;
	autoY: boolean;
	children?: React.ReactNode;
}) {
	const { left, right, top, bottom, autoX, autoY, children } = props;
	const auto =
		autoX && autoY
			? Enum.AutomaticSize.XY
			: autoY
				? Enum.AutomaticSize.Y
				: autoX
					? Enum.AutomaticSize.X
					: Enum.AutomaticSize.None;
	return (
		<frame
			key="Pad"
			Position={new UDim2(0, left, 0, top)}
			Size={new UDim2(autoX ? 0 : 1, autoX ? 0 : -(left + right), autoY ? 0 : 1, autoY ? 0 : -(top + bottom))}
			AutomaticSize={auto}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			{(autoX || autoY) && (
				<uipadding
					PaddingRight={new UDim(0, autoX ? right : 0)}
					PaddingBottom={new UDim(0, autoY ? bottom : 0)}
				/>
			)}
			{children}
		</frame>
	);
}
