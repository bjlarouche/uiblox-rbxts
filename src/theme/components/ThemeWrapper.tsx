import React, { useEffect, useRef } from "@rbxts/react";
import { Theme } from "../interfaces/theme";
import { default as DefaultTheme } from "../themes";
import { CustomizedProps } from "theme/types";
import { useProducer, useSelector } from "@rbxts/react-reflex";
import { themeProducer, ThemeProducer } from "./ThemeProducer";

export interface ThemeWrapperProps {
	theme?: Theme;
}

function ThemeWrapper(props: CustomizedProps<Instance, ThemeWrapperProps>) {
	const { theme, children } = props;
	const { setTheme } = useProducer<ThemeProducer>();
	const ref = useRef<Frame>();

	// When theme prop changes
	useEffect(() => {
		setTheme(theme ?? DefaultTheme);
	}, [theme]);

	return (
		<frame
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={500000}
			ref={ref}
		>
			{children}
		</frame>
	);
}

export default ThemeWrapper;
