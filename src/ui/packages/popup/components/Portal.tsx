import React from "@rbxts/react";
import { createPortal } from "@rbxts/react-roblox";
import { portalTarget } from "./portalTarget";

export interface PortalProps {
	host?: Instance;
	children?: React.ReactNode;
}

function Portal(props: PortalProps) {
	const layer = portalTarget(props.host);
	if (!layer || props.children === undefined) return undefined;
	return createPortal(props.children, layer);
}

export default Portal;
