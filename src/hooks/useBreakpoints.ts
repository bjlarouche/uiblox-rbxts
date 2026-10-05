import { useEffect, useState } from "@rbxts/react";
import { breakpointName, orientationName } from "./breakpoints";

export function useBreakpoints(host?: GuiObject) {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (host === undefined) return;
		const read = () => setSize({ width: host.AbsoluteSize.X, height: host.AbsoluteSize.Y });
		read();
		const connection = host.GetPropertyChangedSignal("AbsoluteSize").Connect(read);
		return () => connection.Disconnect();
	}, [host]);

	return {
		width: size.width,
		height: size.height,
		name: breakpointName(size.width),
		orientation: orientationName(size.width, size.height),
	};
}
