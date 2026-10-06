import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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
		<SxHost
			tag="textbutton"
			key={id || "Backdrop"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			Event={{
				Activated: () => onClick?.(),
			}}
		>
			{children}
		</SxHost>
	);
}

export default Backdrop;
