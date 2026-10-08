import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { ListItemTone } from "./listItemInk";
import { listItemCopyInset } from "./listItemLayout";
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
	onActivated?: () => void;
}

function ListItem(props: CustomizedProps<TextButton, ListItemProps>) {
	const { text, secondary, selected = false, disabled = false, dense = false, divider = false, wrap = false, tone, leading, onActivated, className, sx, id, ref } =
		props;
	const styles = useListItemStyles({ selected, disabled, dense, wrap, tone });
	const inset = listItemCopyInset(leading !== undefined);
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
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, selected }}
			Text=""
			Active={!disabled}
			Selectable={!disabled}
			AutoButtonColor={false}
			Event={{
				Activated: () => {
					if (!disabled && onActivated !== undefined) onActivated();
				},
			}}
		>
			<uipadding {...styles.padding} />
			<uilistlayout {...styles.list} />
			{inset > 0 ? (
				<frame key="Body" Size={new UDim2(1, 0, 0, 0)} AutomaticSize={Enum.AutomaticSize.Y} BackgroundTransparency={1} BorderSizePixel={0}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						VerticalAlignment={Enum.VerticalAlignment.Center}
						Padding={new UDim(0, 8)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					<frame key="Lead" LayoutOrder={0} Size={UDim2.fromOffset(inset, inset)} BackgroundTransparency={1} BorderSizePixel={0}>
						{leading}
					</frame>
					<frame
						key="Copy"
						LayoutOrder={1}
						Size={new UDim2(1, -(inset + 8), 0, 0)}
						AutomaticSize={Enum.AutomaticSize.Y}
						BackgroundTransparency={1}
						BorderSizePixel={0}
					>
						<uilistlayout {...styles.list} />
						{copy}
					</frame>
				</frame>
			) : (
				copy
			)}
			{divider === true ? <frame key="Divider" {...styles.divider} /> : undefined}
		</SxHost>
	);
}

export default ListItem;
