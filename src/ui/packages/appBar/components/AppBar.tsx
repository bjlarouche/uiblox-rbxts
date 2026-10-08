import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Shadow } from "ui/packages/shadow";
import { SxHost } from "ui/packages/host";
import { appBarSubtitle } from "./appBarSubtitle";
import useAppBarStyles, { AppBarColor, AppBarElevation } from "./AppBar.styles";

export interface AppBarProps {
	title?: string;
	subtitle?: string;
	elevation?: AppBarElevation;
	color?: AppBarColor;
	children?: React.ReactNode;
}

function AppBar(props: CustomizedProps<Frame, AppBarProps>) {
	const { title = "", subtitle, elevation = "raised", color = "default", children, className, sx, id, ref } = props;
	const hasActions = children !== undefined;
	const styles = useAppBarStyles({ elevation, color, hasActions });
	const line = appBarSubtitle(subtitle);
	const titleLabel =
		line === undefined ? (
			title !== "" && <textlabel key="Title" {...styles.title} Text={title} />
		) : (
			<frame key="Titles" {...styles.titles}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					HorizontalAlignment={Enum.HorizontalAlignment.Left}
					SortOrder={Enum.SortOrder.LayoutOrder}
					Padding={new UDim(0, 0)}
				/>
				{title !== "" && (
					<textlabel
						key="Title"
						{...styles.title}
						Size={new UDim2(0, 0, 0, 0)}
						AutomaticSize={Enum.AutomaticSize.XY}
						Text={title}
						LayoutOrder={1}
					/>
				)}
				<textlabel key="Subtitle" {...styles.subtitle} Text={line} LayoutOrder={2} />
			</frame>
		);
	return (
		<SxHost tag="frame" key={id || "AppBar"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uipadding {...styles.padding} />
			{elevation === "raised" && <Shadow />}
			{hasActions ? (
				<frame key="Row" Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1} BorderSizePixel={0}>
					<uilistlayout {...styles.row} />
					{titleLabel}
					<frame key="Actions" {...styles.actions}>
						<uilistlayout {...styles.actionsLayout} />
						{children}
					</frame>
				</frame>
			) : (
				titleLabel
			)}
		</SxHost>
	);
}

export default AppBar;
