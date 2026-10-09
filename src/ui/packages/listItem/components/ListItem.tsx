import React, { useEffect, useState } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { ListItemTone } from "./listItemInk";
import { listItemCopyInset, listItemFill, listItemRowInset, listItemTrailInset } from "./listItemLayout";
import useListItemStyles from "./ListItem.styles";

export interface ListItemProps {
	text: string;
	secondary?: string;
	selected?: boolean;
	disabled?: boolean;
	dense?: boolean;
	divider?: boolean;
	wrap?: boolean;
	tone?: ListItemTone;
	leading?: React.ReactNode;
	trailing?: React.ReactNode;
	onActivated?: () => void;
}

function ListItem(props: CustomizedProps<TextButton, ListItemProps>) {
	const { text, secondary, selected = false, disabled = false, dense = false, divider = false, wrap = false, tone, leading, trailing, onActivated, className, sx, id, ref } =
		props;
	const styles = useListItemStyles({ selected, disabled, dense, wrap, tone });
	const { theme } = useTheme();
	const [hovering, setHovering] = useState(false);
	const [down, setDown] = useState(false);
	const face = listItemFill({ disabled, selected, hover: hovering && !disabled, down: down && !disabled });
	const fill =
		face === "pressed" ? theme.palette.action.pressed : face === "hover" ? theme.palette.action.hover : theme.palette.action.selected;
	const lead = listItemCopyInset(leading !== undefined);

	useEffect(() => {
		if (!disabled) return;
		setHovering(false);
		setDown(false);
	}, [disabled]);
	const trail = listItemTrailInset(trailing !== undefined);
	const rowInset = listItemRowInset(leading !== undefined, trailing !== undefined);
	const copy = (
		<>
			<textlabel key="Primary" {...styles.primary} Text={text} />
			{secondary !== undefined && secondary.size() > 0 ? (
				<textlabel key="Secondary" {...styles.secondary} Text={secondary} />
			) : undefined}
		</>
	);
	return (
		<SxHost
			tag="textbutton"
			key={id || "ListItem"}
			hostRef={ref}
			base={{
				...styles.root,
				BackgroundColor3: fill,
				BackgroundTransparency: face === "clear" ? 1 : 0,
			}}
			className={className}
			sx={sx}
			state={{ disabled, selected, hover: hovering, pressed: down }}
			Text=""
			Active={!disabled}
			Selectable={!disabled}
			AutoButtonColor={false}
			Event={{
				Activated: () => {
					if (!disabled && onActivated !== undefined) onActivated();
				},
				MouseEnter: () => {
					if (!disabled) setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
					setDown(false);
				},
				MouseButton1Down: () => {
					if (!disabled) setDown(true);
				},
				MouseButton1Up: () => setDown(false),
			}}
		>
			<uipadding {...styles.padding} />
			<uilistlayout {...styles.list} />
			{rowInset > 0 ? (
				<frame key="Body" Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1} BorderSizePixel={0}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0, 8)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{lead > 0 ? (
						<frame key="Lead" LayoutOrder={0} Size={UDim2.fromOffset(lead, lead)} BackgroundTransparency={1} BorderSizePixel={0}>
							{leading}
						</frame>
					) : undefined}
					<frame
						key="Copy"
						LayoutOrder={1}
						Size={new UDim2(1, -rowInset, 0, 0)}
						AutomaticSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						BorderSizePixel={0}
					>
						<uilistlayout {...styles.list} />
						{copy}
					</frame>
					{trail > 0 ? (
						<frame
							key="Trail"
							LayoutOrder={2}
							Size={new UDim2(0, trail, 0, 0)}
							AutomaticSize={Enum.AutomaticSize.Y}
							BackgroundTransparency={1}
							BorderSizePixel={0}
						>
							{trailing}
						</frame>
					) : undefined}
				</frame>
			) : (
				copy
			)}
			{divider === true ? <frame key="Divider" {...styles.divider} /> : undefined}
		</SxHost>
	);
}

export default ListItem;
