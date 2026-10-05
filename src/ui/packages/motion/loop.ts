import { TweenService } from "@rbxts/services";
import { stopOnce } from "./unit";

export function loopProperty(instance: Instance, goal: object, duration: number, reverses = false) {
	const tween = TweenService.Create(
		instance,
		new TweenInfo(duration, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1, reverses),
		goal as never,
	);
	tween.Play();
	return stopOnce(() => {
		tween.Cancel();
		tween.Destroy();
	});
}
