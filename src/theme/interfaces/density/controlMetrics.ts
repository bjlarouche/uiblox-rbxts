export type ControlSize = "small" | "medium" | "large";
export type ThemeDensity = "compact" | "comfortable";

export interface ControlMetrics {
	height: number;
	checkbox: number;
	switchTrackW: number;
	switchTrackH: number;
	switchThumb: number;
	switchInset: number;
	sliderHeight: number;
	sliderTrack: number;
	sliderKnob: number;
	radio: number;
	icon: number;
	font: number;
	markFont: number;
	buttonHeight: number;
	buttonWidth: number;
}

const METRICS: Record<ControlSize, ControlMetrics> = {
	small: {
		height: 22,
		checkbox: 16,
		switchTrackW: 32,
		switchTrackH: 18,
		switchThumb: 14,
		switchInset: 2,
		sliderHeight: 22,
		sliderTrack: 4,
		sliderKnob: 12,
		radio: 14,
		icon: 14,
		font: 13,
		markFont: 11,
		buttonHeight: 24,
		buttonWidth: 96,
	},
	medium: {
		height: 24,
		checkbox: 20,
		switchTrackW: 48,
		switchTrackH: 24,
		switchThumb: 18,
		switchInset: 3,
		sliderHeight: 24,
		sliderTrack: 6,
		sliderKnob: 14,
		radio: 18,
		icon: 18,
		font: 14,
		markFont: 12,
		buttonHeight: 36,
		buttonWidth: 144,
	},
	large: {
		height: 36,
		checkbox: 24,
		switchTrackW: 60,
		switchTrackH: 36,
		switchThumb: 30,
		switchInset: 3,
		sliderHeight: 36,
		sliderTrack: 8,
		sliderKnob: 18,
		radio: 22,
		icon: 18,
		font: 16,
		markFont: 12,
		buttonHeight: 48,
		buttonWidth: 192,
	},
};

export function resolveControlSize(density?: ThemeDensity, size?: ControlSize): ControlSize {
	if (size !== undefined) return size;
	return density === "compact" ? "small" : "medium";
}

export function controlMetrics(density?: ThemeDensity, size?: ControlSize): ControlMetrics {
	return METRICS[resolveControlSize(density, size)];
}
