export type SkeletonAnimation = "pulse" | "shimmer" | false;

export function skeletonMotion(animation: SkeletonAnimation | undefined, reducedMotion?: boolean): SkeletonAnimation {
	if (animation === false || reducedMotion === true) return false;
	return animation ?? "shimmer";
}

export function skeletonLineWidth(width: number, index: number, count: number) {
	if (count > 1 && index === count - 1) return (width * 62) / 100;
	return width;
}
