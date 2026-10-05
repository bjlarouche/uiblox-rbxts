import React, { useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useLinkStyles, { LinkColor, LinkUnderline } from "./Link.styles";

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
	const styles = useLinkStyles({ color, disabled, showUnderline });
	const active = canActivate(disabled);
	return (
		<textbutton
			key={id || "Link"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
			Text={text}
			Active={active}
			Selectable={active}
			Event={{
				Activated: () => {
					if (active) onActivated?.();
				},
				MouseEnter: () => setHover(true),
				MouseLeave: () => setHover(false),
			}}
		>
			<frame key="Underline" {...styles.underline} />
		</textbutton>
	);
}

export default Link;
