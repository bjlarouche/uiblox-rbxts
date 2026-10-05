import React from "@rbxts/react";
import { CustomizedProps } from "theme";
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
		<frame key={id || "Box"} ref={ref} {...styles.root} {...className} {...sx}>
			{padding !== undefined && <uipadding {...styles.padding} />}
			{children}
		</frame>
	);
}

export default Box;
