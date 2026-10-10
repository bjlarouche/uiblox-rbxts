import React from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, useTheme } from "theme";
import { Icons } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { Icon } from "ui/packages/icon";
import { ListItem } from "ui/packages/listItem";
import { listItemInk } from "ui/packages/listItem/components/listItemInk";
import { Popup } from "ui/packages/popup";
import { EmptyListHint } from "ui/packages/virtualList";
import { menuIcon, menuRow, menuWidth } from "./menuIcon";
import useMenuStyles from "./Menu.styles";

export interface MenuItem {
	id: string;
	text: string;
	icon?: Icons;
	disabled?: boolean;
	tone?: "danger";
}

export interface MenuProps {
	anchor?: GuiObject;
	open: boolean;
	items: MenuItem[];
	onSelect: (id: string) => void;
	onClose: () => void;
	emptyText?: string;
	empty?: React.Element;
	dense?: boolean;
	selected?: string;
}

function Menu(props: CustomizedProps<Frame, MenuProps>) {
	const { anchor, open, items, onSelect, onClose, emptyText, empty, dense, selected, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const styles = useMenuStyles();
	if (!open) return undefined;
	const vacant = items.size() === 0;
	const icons = items.some((item) => menuIcon(item.icon) !== undefined);
	const row = menuRow(dense, icons);
	const height = (vacant ? menuRow(dense) : items.size() * row) + theme.shape.borderRadius * 2 + 2;
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textSize = (dense === true ? theme.typography.fontSizes.caption : theme.typography.fontSizes.body) ?? 14;
	let widest = 0;
	for (const item of items) {
		const bounds = TextService.GetTextSize(item.text, textSize, font, new Vector2(10000, 100));
		if (bounds.X > widest) widest = bounds.X;
	}
	const pad = theme.padding.calc(dense === true ? 1 : 2);
	const floor = anchor !== undefined ? anchor.AbsoluteSize.X : 0;
	const width = vacant ? 0 : menuWidth(widest, icons, pad, floor);
	return (
		<Popup anchor={anchor} preferredHeight={height} preferredWidth={width} onDismiss={onClose}>
			<SxHost tag="frame" key={id || "Surface"} hostRef={ref} base={styles.surface} className={className} sx={sx}>
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
				<uipadding {...styles.inset} />
				<uilistlayout {...styles.list} />
				{vacant
					? (empty ?? <EmptyListHint text={emptyText ?? "No options"} height={row} />)
					: (
						<>
							{items.map((item) => {
								const glyph = menuIcon(item.icon);
								const ink = listItemInk(item.tone, item.disabled);
								const tint =
									ink === "error"
										? theme.palette.status.error.main
										: ink === "disabled"
											? theme.palette.text.disabled
											: theme.palette.text.primary;
								return (
									<ListItem
										key={item.id}
										text={item.text}
										disabled={item.disabled}
										tone={item.tone}
										dense={dense}
										selected={item.id === selected}
										leading={glyph !== undefined ? <Icon icon={glyph as Icons} size="sm" tint={tint} /> : undefined}
										onActivated={() => {
											if (item.disabled === true) return;
											onSelect(item.id);
											onClose();
										}}
									/>
								);
							})}
						</>
					)}
			</SxHost>
		</Popup>
	);
}

export default Menu;
