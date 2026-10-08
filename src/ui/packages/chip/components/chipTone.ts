export type ChipColor = "default" | "primary" | "success" | "error";

/** Unknown colors stay the plain chip. Primary, success, and error keep their tone. */
export function chipTone(color?: ChipColor): ChipColor {
	if (color === "primary" || color === "success" || color === "error") return color;
	return "default";
}
