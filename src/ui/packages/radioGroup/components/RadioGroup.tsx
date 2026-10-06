import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import useRadioGroupStyles from "./RadioGroup.styles";

export interface ChoiceOption<T> {
	label: string;
	value: T;
	disabled?: boolean;
	group?: string;
}

export interface RadioGroupProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	size?: ControlSize;
	row?: boolean;
}

function RadioGroup<T>(props: CustomizedProps<Frame, RadioGroupProps<T>>) {
	const { value, options, onChange, disabled, size, row, className, sx, id, ref } = props;
	const { root, list, option, optionRow, ring, dot, stroke, corner, label } = useRadioGroupStyles({ size, row });

	return (
		<SxHost tag="frame" key={id || "RadioGroup"} hostRef={ref} base={root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...list} />
			<>
			{options.map((choice, index) => {
				const active = canActivate(disabled || choice.disabled);
				const fade = active ? 0 : 0.5;
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
						<textlabel {...label} Text={choice.label} TextTransparency={fade} LayoutOrder={2} />
					</textbutton>
				);
			})}
			</>
		</SxHost>
	);
}

export default RadioGroup;
