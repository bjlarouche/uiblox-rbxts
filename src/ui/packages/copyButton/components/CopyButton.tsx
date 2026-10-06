import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Button } from "ui/packages/button";
import { copyInvoke } from "./copyInvoke";

export interface CopyButtonProps {
	text: string;
	onCopy?: (text: string) => void;
	disabled?: boolean;
}

function CopyButton(props: CustomizedProps<TextButton, CopyButtonProps>) {
	const { text, onCopy, disabled, className, sx, id, ref } = props;
	return (
		<Button
			id={id}
			ref={ref}
			className={className}
			sx={sx}
			text="Copy"
			size="small"
			variant="text"
			disabled={disabled}
			onLeftClick={() => copyInvoke(text, onCopy)}
		/>
	);
}

export default CopyButton;
