import React, { useEffect, useRef, useState } from "@rbxts/react";
import { observeViewport } from "hooks/viewportObserver";
import { useTheme } from "theme";
import { StyleState } from "theme/styles/utilities/resolveStyle";
import { SxInput } from "theme/styles/utilities/resolveSx";
import { elementProps, elementType, hostKind, hostRest, layoutGapPatch, sxUsesBreakpoints } from "../hostRules";
import { paintHostStyle } from "../hostPaint";

export interface SxHostProps {
	tag?: string;
	base?: object;
	className?: object;
	sx?: SxInput | object;
	state?: StyleState;
	hostRef?: React.Ref<any>;
	children?: React.ReactNode;
	[key: string]: unknown;
}

function setRef(hostRef: React.Ref<Instance> | undefined, instance: Instance | undefined) {
	if (hostRef === undefined) return;
	if (typeIs(hostRef, "function")) {
		(hostRef as (value: Instance | undefined) => void)(instance);
		return;
	}
	(hostRef as { current?: Instance }).current = instance;
}

function SxHost(props: SxHostProps) {
	const tag = props.tag ?? "frame";
	const sx = props.sx as SxInput | undefined;
	const { theme } = useTheme();
	const bound = useRef<GuiObject>();
	const [width, setWidth] = useState<number | undefined>(undefined);
	const [hover, setHover] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [focused, setFocused] = useState(false);

	useEffect(() => {
		const host = bound.current;
		if (host === undefined || !sxUsesBreakpoints(sx)) return;
		return observeViewport(host, (size) => {
			setWidth((prev) => (prev === size.width ? prev : size.width));
		});
	}, [sx]);

	const passed = props.state;
	const locked = passed?.disabled === true;
	const paint = paintHostStyle(theme, props.base, props.className, sx, width, {
		hover,
		pressed,
		focused,
		...passed,
	});
	const rest = hostRest(props);
	const caller = rest.Event as { [key: string]: (...args: never[]) => void } | undefined;
	rest.Event = {
		...caller,
		MouseEnter: (...args: never[]) => {
			if (!locked) setHover(true);
			caller?.MouseEnter?.(...args);
		},
		MouseLeave: (...args: never[]) => {
			setHover(false);
			setPressed(false);
			caller?.MouseLeave?.(...args);
		},
		MouseButton1Down: (...args: never[]) => {
			if (!locked) setPressed(true);
			caller?.MouseButton1Down?.(...args);
		},
		MouseButton1Up: (...args: never[]) => {
			setPressed(false);
			caller?.MouseButton1Up?.(...args);
		},
		SelectionGained: (...args: never[]) => {
			if (!locked) setFocused(true);
			caller?.SelectionGained?.(...args);
		},
		SelectionLost: (...args: never[]) => {
			setFocused(false);
			caller?.SelectionLost?.(...args);
		},
	};
	const nodes = React.Children.toArray(props.children);
	const painted = new Array<React.Element>();
	let hasPad = false;
	let hasCorner = false;
	for (const node of nodes) {
		if (!React.isValidElement(node)) continue;
		const kind = hostKind(elementType(node));
		if (kind === "uipadding") hasPad = true;
		if (kind === "uicorner") hasCorner = true;
		const patch = kind !== undefined ? layoutGapPatch(kind, elementProps(node), paint.gap) : undefined;
		painted.push(patch !== undefined ? React.cloneElement(node, patch) : node);
	}
	if (!hasPad && paint.padding !== undefined) painted.push(React.createElement("uipadding", paint.padding));
	if (!hasCorner && paint.corner !== undefined) painted.push(React.createElement("uicorner", paint.corner));

	return React.createElement(tag, {
		...paint.props,
		...rest,
		ref: (instance: GuiObject) => {
			bound.current = instance;
			setRef(props.hostRef, instance);
		},
		children: painted,
	});
}

export default SxHost;
