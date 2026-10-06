import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { coverFill } from "./coverFill";

export interface CoverProps {
	value?: number;
	children?: React.ReactNode;
}

function Cover(props: CustomizedProps<Frame, CoverProps>) {
	const { value, children, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const fill = coverFill(value);
	return (
		<SxHost
			tag="frame"
			key={id || "Cover"}
			hostRef={ref}
			base={{
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ClipsDescendants: true,
			}}
			className={className}
			sx={sx}
		>
			{children}
			{fill > 0 ? (
				<frame
					key="Shade"
					Size={new UDim2(1, 0, fill, 0)}
					BackgroundColor3={theme.palette.backdrop}
					BackgroundTransparency={0.35}
					BorderSizePixel={0}
					ZIndex={2}
				/>
			) : undefined}
		</SxHost>
	);
}

export default Cover;
