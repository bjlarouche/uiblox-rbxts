import React, { useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import useLinkStyles, { LinkColor, LinkUnderline } from "./Link.styles";

function escapeRich(text: string) {
	let out = text;
	for (const [from, to] of [
		["&", "&amp;"],
		["<", "&lt;"],
		[">", "&gt;"],
	] as const) {
		const [replaced] = out.gsub(from, to);
		out = replaced;
	}
	return out;
}

export interface LinkProps {
	text: string;
	color?: LinkColor;
	underline?: LinkUnderline;
	disabled?: boolean;
	onActivated?: () => void;
}

function Link(props: CustomizedProps<TextButton, LinkProps>) {
	const { text, color = "primary", underline = "always", disabled, onActivated, className, sx, id, ref } = props;
	const [hover, setHover] = useState(false);
	const showUnderline = underline === "always" || (underline === "hover" && hover);
	const styles = useLinkStyles({ color, disabled });
	const active = canActivate(disabled);
	const label = escapeRich(text);
	return (
		<SxHost
			tag="textbutton"
			key={id || "Link"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, hover }}
			Text={showUnderline ? `<u>${label}</u>` : label}
			Active={active}
			Selectable={active}
			Event={{
				Activated: () => {
					if (active) onActivated?.();
				},
				MouseEnter: () => setHover(true),
				MouseLeave: () => setHover(false),
			}}
		/>
	);
}

export default Link;
