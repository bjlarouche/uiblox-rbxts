import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import useBackdropStyles from "./Backdrop.styles";

export interface BackdropProps {
	open?: boolean;
	invisible?: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}

function Backdrop(props: CustomizedProps<TextButton, BackdropProps>) {
	const { open = true, invisible, onClick, children, className, sx, id, ref } = props;
	const styles = useBackdropStyles({ invisible });
	if (open !== true) return undefined;
	return (
		<textbutton
			key={id || "Backdrop"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
			Event={{
				Activated: () => onClick?.(),
			}}
		>
			{children}
		</textbutton>
	);
}

export default Backdrop;
