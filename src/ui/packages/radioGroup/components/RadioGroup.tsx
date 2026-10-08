import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import { radioHint } from "./radioHint";
import useRadioGroupStyles from "./RadioGroup.styles";

export interface ChoiceOption<T> {
	label: string;
	value: T;
	disabled?: boolean;
	group?: string;
}

export interface RadioOption<T> extends ChoiceOption<T> {
	hint?: string;
}

export interface RadioGroupProps<T> {
	value: T;
	options: RadioOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	size?: ControlSize;
	row?: boolean;
}

function RadioGroup<T>(props: CustomizedProps<Frame, RadioGroupProps<T>>) {
	const { value, options, onChange, disabled, size, row, className, sx, id, ref } = props;
	const { root, list, option, optionRow, ring, dot, stroke, corner, label, hint, notes } = useRadioGroupStyles({ size, row });

	return (
		<SxHost tag="frame" key={id || "RadioGroup"} hostRef={ref} base={root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...list} />
			<>
			{options.map((choice, index) => {
				const active = canActivate(disabled || choice.disabled);
				const fade = active ? 0 : 0.5;
				const note = radioHint(choice.hint);
				return (
					<textbutton
						key={`${choice.label}-${index}`}
						{...option}
						LayoutOrder={index}
						Active={active}
						Selectable={active}
						Event={{
							Activated: () => {
								if (active && choice.value !== value) onChange(choice.value);
							},
						}}
					>
						<uilistlayout {...optionRow} />
						<frame {...ring} LayoutOrder={1}>
							<uicorner {...corner} />
							<uistroke {...stroke} Transparency={fade} />
							{choice.value === value && (
								<frame {...dot} BackgroundTransparency={fade}>
									<uicorner {...corner} />
								</frame>
							)}
						</frame>
						{note === undefined ? (
							<textlabel {...label} Text={choice.label} TextTransparency={fade} LayoutOrder={2} />
						) : (
							<frame {...notes} LayoutOrder={2}>
								<uilistlayout FillDirection={Enum.FillDirection.Vertical} SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0, 0)} />
								<textlabel {...label} Text={choice.label} TextTransparency={fade} LayoutOrder={1} />
								<textlabel {...hint} Text={note} TextTransparency={fade} LayoutOrder={2} />
							</frame>
						)}
					</textbutton>
				);
			})}
			</>
		</SxHost>
	);
}

export default RadioGroup;
