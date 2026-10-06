import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { BoxPad } from "./boxPad";
import useBoxStyles, { BoxBg } from "./Box.styles";

export interface BoxProps {
	padding?: BoxPad;
	bgcolor?: BoxBg;
	children?: React.ReactNode;
}

function Box(props: CustomizedProps<Frame, BoxProps>) {
	const { padding, bgcolor, children, className, sx, id, ref } = props;
	const styles = useBoxStyles({ padding, bgcolor });
	return (
		<SxHost key={id || "Box"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			{padding !== undefined && <uipadding {...styles.padding} />}
			{children}
		</SxHost>
	);
}

export default Box;
