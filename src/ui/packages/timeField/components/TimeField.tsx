import React from "@rbxts/react";
import { controlMetrics, CustomizedProps, useTheme } from "theme";
import { fieldChrome } from "ui/packages/input/components/fieldChrome";
import { NumberInput } from "ui/packages/numberInput";
import { SxHost } from "ui/packages/host";
import { resolveTime, TimeOfDay } from "../timeValue";

export interface TimeFieldProps {
	value: TimeOfDay;
	onChange: (value: TimeOfDay) => void;
	step?: number;
	wrap?: boolean;
	min?: number;
	max?: number;
	disabled?: boolean;
}

function TimeField(props: CustomizedProps<Frame, TimeFieldProps>) {
	const { value, onChange, step = 1, wrap = true, min, max, disabled, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const chrome = fieldChrome(controlMetrics(theme.density).height, theme.padding.calc(1));
	const commit = (hour: number, minute: number) => {
		const resolved = resolveTime({ hour, minute }, step, wrap, min, max);
		if (resolved === undefined) return;
		if (resolved.hour === value.hour && resolved.minute === value.minute) return;
		onChange(resolved);
	};

	return (
		<SxHost
			tag="frame"
			key={id || "TimeField"}
			hostRef={ref}
			base={{
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			}}
			className={className}
			sx={sx}
		>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, chrome.padX)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<NumberInput
				value={value.hour}
				step={1}
				disabled={disabled}
				width={new UDim(0, theme.spacing.calc(12))}
				sx={{ LayoutOrder: 0 }}
				onChange={(hour) => commit(hour, value.minute)}
			/>
			<textlabel
				Text=":"
				LayoutOrder={1}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Size={UDim2.fromOffset(8, chrome.height)}
				TextTruncate={Enum.TextTruncate.AtEnd}
				TextWrapped={false}
				Font={theme.typography.fontFamilies.default}
				TextSize={theme.typography.fontSizes.body}
				TextColor3={theme.palette.text.secondary}
			/>
			<NumberInput
				value={value.minute}
				step={step}
				disabled={disabled}
				width={new UDim(0, theme.spacing.calc(12))}
				sx={{ LayoutOrder: 2 }}
				onChange={(minute) => commit(value.hour, minute)}
			/>
		</SxHost>
	);
}

export default TimeField;
