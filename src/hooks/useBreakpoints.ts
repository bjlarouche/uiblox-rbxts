import { useEffect, useState } from "@rbxts/react";
import { breakpointName, orientationName } from "./breakpoints";
import { observeViewport } from "./viewportObserver";

export function useBreakpoints(host?: GuiObject) {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (host === undefined) return;
		return observeViewport(host, (next) => {
			setSize((prev) => {
				if (
					breakpointName(prev.width) === breakpointName(next.width) &&
					orientationName(prev.width, prev.height) === orientationName(next.width, next.height)
				) {
					return prev;
				}
				return next;
			});
		});
	}, [host]);

	return {
		width: size.width,
		height: size.height,
		name: breakpointName(size.width),
		orientation: orientationName(size.width, size.height),
	};
}
