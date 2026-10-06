import React, { useMemo, useState } from "@rbxts/react";
import { cx, CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { canActivate } from "ui/packages/button/components/activation";
import { Input } from "ui/packages/input";
import { Popup } from "ui/packages/popup";
import { VirtualList } from "ui/packages/virtualList";
import { brickColorCatalog } from "./brickColorCatalog";
import { filterBrickNames } from "./brickColorFilter";
import useBrickColorPickerStyles from "./BrickColorPicker.styles";

export interface BrickColorPickerProps {
	value: BrickColor;
	onChange: (value: BrickColor) => void;
	disabled?: boolean;
	placeholder?: string;
}

const ROW = 28;

function BrickColorPicker(props: CustomizedProps<Frame, BrickColorPickerProps>) {
	const { value, onChange, disabled, placeholder = "BrickColor", className, sx, id, ref } = props;
	const styles = useBrickColorPickerStyles();
	const { theme } = useTheme();
	const active = canActivate(disabled);
	const [anchor, setAnchor] = useState<TextButton>();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const catalog = useMemo(() => brickColorCatalog(), []);
	const filtered =
		query.size() === 0
			? catalog
			: catalog.filter((color) => filterBrickNames([color.Name], query).size() > 0);
	const shown = open && active;
	const menuHeight = math.min(filtered.size() * ROW + ROW, theme.spacing.calc(16));

	const close = () => {
		setOpen(false);
		setQuery("");
	};

	return (
		<SxHost tag="frame" key={id || "BrickColorPicker"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<textbutton
				key="Trigger"
				ref={setAnchor}
				{...styles.trigger}
				Active={active}
				Selectable={active}
				Event={{
					Activated: () => {
						if (!active) return;
						if (shown) close();
						else {
							setQuery("");
							setOpen(true);
						}
					},
				}}
			>
				<uipadding {...styles.padding} />
				<uilistlayout {...styles.row} />
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
				<frame key="Swatch" {...styles.swatch} BackgroundColor3={value.Color} LayoutOrder={1}>
					<uicorner {...styles.corner} />
					<uistroke {...styles.stroke} />
				</frame>
				<textlabel key="Name" {...styles.label} Text={value.Name.size() > 0 ? value.Name : placeholder} LayoutOrder={2} />
			</textbutton>
			{shown && (
				<Popup anchor={anchor} preferredHeight={menuHeight} preferredWidth={theme.spacing.calc(14)} onDismiss={close}>
					<frame key="Menu" {...styles.menu}>
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
						<uilistlayout FillDirection={Enum.FillDirection.Vertical} SortOrder={Enum.SortOrder.LayoutOrder} />
						<frame key="Search" {...styles.search} LayoutOrder={1}>
							<Input
								text={query}
								placeholder="Search"
								width={new UDim(1, 0)}
								onInput={(text) => setQuery(text)}
							/>
						</frame>
						<frame
							key="ListHost"
							Size={new UDim2(1, 0, 1, -ROW)}
							BackgroundTransparency={1}
							LayoutOrder={2}
						>
							<VirtualList
								items={filtered}
								getKey={(color) => `${color.Number}-${color.Name}`}
								itemHeight={ROW}
								className={styles.list}
								renderItem={(color) => {
									const picked = color.Number === value.Number;
									return (
										<textbutton
											{...cx<TextButton>(styles.option, picked && styles.selected)}
											Active={true}
											Selectable={true}
											Event={{
												Activated: () => {
													onChange(color);
													close();
												},
											}}
										>
											<uipadding {...styles.padding} />
											<uilistlayout {...styles.row} />
											<frame {...styles.swatch} BackgroundColor3={color.Color} LayoutOrder={1}>
												<uicorner {...styles.corner} />
												<uistroke {...styles.stroke} />
											</frame>
											<textlabel {...styles.optionLabel} Text={color.Name} LayoutOrder={2} />
										</textbutton>
									);
								}}
							/>
						</frame>
					</frame>
				</Popup>
			)}
		</SxHost>
	);
}

export default BrickColorPicker;
