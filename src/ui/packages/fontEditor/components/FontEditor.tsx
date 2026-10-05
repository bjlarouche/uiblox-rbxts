import React, { useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { Input } from "ui/packages/input";
import { Select } from "ui/packages/select";
import useFontEditorStyles from "./FontEditor.styles";
import { enumFamilies, familyLabel, writeFont } from "./fontValue";

export interface FontEditorProps {
	value: Font;
	onChange: (value: Font) => void;
	disabled?: boolean;
}

function enumOptions(items: EnumItem[]) {
	return items.map((item) => ({ label: item.Name, value: item.Name }));
}

let cachedFamilies: ReturnType<typeof enumFamilies> | undefined;

function builtInFamilies() {
	if (cachedFamilies !== undefined) return cachedFamilies;
	const fonts = new Array<{ Family: string }>();
	for (const item of Enum.Font.GetEnumItems()) fonts.push(Font.fromEnum(item));
	cachedFamilies = enumFamilies(fonts);
	return cachedFamilies;
}

function FontEditor(props: CustomizedProps<Frame, FontEditorProps>) {
	const { value, onChange, disabled, className, id, ref } = props;
	const styles = useFontEditorStyles();
	const active = canActivate(disabled);
	const families = builtInFamilies();
	if (families.find((item) => item.family === value.Family) === undefined) {
		families.insert(0, { label: familyLabel(value.Family), family: value.Family });
	}
	const [custom, setCustom] = useState(value.Family);
	const weights = enumOptions(Enum.FontWeight.GetEnumItems());
	const stylesList = enumOptions(Enum.FontStyle.GetEnumItems());

	return (
		<frame key={id || "FontEditor"} ref={ref} {...styles.root} {...className}>
			<uilistlayout {...styles.column} />
			<frame key="Family" {...styles.row} LayoutOrder={1}>
				<Select
					value={value.Family}
					options={families.map((item) => ({ label: item.label, value: item.family }))}
					disabled={disabled}
					className={styles.fill}
					onChange={(family) => {
						setCustom(family);
						onChange(writeFont(family, value.Weight, value.Style));
					}}
				/>
			</frame>
			<frame key="Custom" {...styles.row} LayoutOrder={2}>
				<Input
					text={custom}
					placeholder="rbxasset://fonts/families/…"
					disabled={disabled}
					width={new UDim(1, 0)}
					onInput={(text) => setCustom(text)}
					onTextChanged={(text) => {
						if (text.size() === 0) return;
						setCustom(text);
						onChange(writeFont(text, value.Weight, value.Style));
					}}
				/>
			</frame>
			<frame key="Face" {...styles.row} LayoutOrder={3}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0, 4)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<frame key="Weight" {...styles.pair} LayoutOrder={1}>
					<Select
						value={value.Weight.Name}
						options={weights}
						disabled={!active}
						className={styles.fill}
						onChange={(name) => {
							const weight = (Enum.FontWeight as unknown as { [key: string]: Enum.FontWeight })[name];
							if (weight !== undefined) onChange(writeFont(value.Family, weight, value.Style));
						}}
					/>
				</frame>
				<frame key="Style" {...styles.pair} LayoutOrder={2}>
					<Select
						value={value.Style.Name}
						options={stylesList}
						disabled={!active}
						className={styles.fill}
						onChange={(name) => {
							const face = (Enum.FontStyle as unknown as { [key: string]: Enum.FontStyle })[name];
							if (face !== undefined) onChange(writeFont(value.Family, value.Weight, face));
						}}
					/>
				</frame>
			</frame>
			<textlabel key="Preview" {...styles.preview} LayoutOrder={4} FontFace={value}>
				<uipadding {...styles.padding} />
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
			</textlabel>
		</frame>
	);
}

export default FontEditor;
