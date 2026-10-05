import { TweenService } from "@rbxts/services";
import { assignGoal, motionDuration } from "./duration";
import { stopOnce } from "./unit";

export function playProperty(instance: Instance, goal: object, duration: number, reducedMotion?: boolean) {
	const seconds = motionDuration(duration, reducedMotion);
	if (seconds === 0) {
		assignGoal(instance, goal);
		return stopOnce(() => {});
	}
	const tween = TweenService.Create(
		instance,
		new TweenInfo(seconds, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
		goal as never,
	);
	tween.Play();
	return stopOnce(() => {
		tween.Cancel();
		tween.Destroy();
	});
}
