export type ButtonVariantName = "contained" | "outlined" | "text";

export type ButtonFill = "primary" | "primaryHover" | "primaryPressed" | "ink" | "actionHover" | "actionPressed" | "none";

export type ButtonLabel = "onPrimary" | "inverse" | "primary" | "ink" | "disabled";

export interface ButtonPaint {
	fill: ButtonFill;
	label: ButtonLabel;
	fillTransparency: number;
	labelTransparency: number;
}

export function buttonPaint(input: {
	variant: ButtonVariantName;
	branded: boolean;
	disabled: boolean;
	hover: boolean;
	down: boolean;
}): ButtonPaint {
	const contained = input.variant !== "outlined" && input.variant !== "text";
	if (input.disabled) {
		if (contained) {
			return {
				fill: input.branded ? "primary" : "ink",
				label: input.branded ? "onPrimary" : "inverse",
				fillTransparency: 0.45,
				labelTransparency: 0.35,
			};
		}
		return { fill: "none", label: "disabled", fillTransparency: 1, labelTransparency: 0 };
	}
	if (contained) {
		if (input.down) {
			return {
				fill: input.branded ? "primaryPressed" : "actionPressed",
				label: input.branded ? "onPrimary" : "ink",
				fillTransparency: 0,
				labelTransparency: 0,
			};
		}
		if (input.hover) {
			return {
				fill: input.branded ? "primaryHover" : "actionHover",
				label: input.branded ? "onPrimary" : "ink",
				fillTransparency: 0,
				labelTransparency: 0,
			};
		}
		return {
			fill: input.branded ? "primary" : "ink",
			label: input.branded ? "onPrimary" : "inverse",
			fillTransparency: 0,
			labelTransparency: 0,
		};
	}
	const label: ButtonLabel = input.branded ? "primary" : "ink";
	if (input.down) return { fill: "actionPressed", label, fillTransparency: 0, labelTransparency: 0 };
	if (input.hover) return { fill: "actionHover", label, fillTransparency: 0, labelTransparency: 0 };
	return { fill: "none", label, fillTransparency: 1, labelTransparency: 0 };
}
