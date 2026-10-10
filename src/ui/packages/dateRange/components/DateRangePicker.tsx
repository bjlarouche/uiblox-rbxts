import React from "@rbxts/react";
import { controlMetrics, CustomizedProps, useTheme } from "theme";
import { fieldChrome } from "ui/packages/input/components/fieldChrome";
import { SxHost } from "ui/packages/host";
import {
	dateStamp,
	DateSpan,
	daysInMonth,
	formatStamp,
	orderSpan,
	shiftDay,
	shiftMonth,
	weekday,
	weekStamps,
} from "../dateRangeValue";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export interface DateRangePickerProps {
	year: number;
	month: number;
	value: DateSpan;
	onChange: (value: DateSpan) => void;
	onMonthChange: (year: number, month: number) => void;
	view?: "month" | "week";
	anchor?: number;
	onAnchorChange?: (stamp: number) => void;
}

function covers(stamp: number, value: DateSpan) {
	if (value.start === undefined) return false;
	if (value.finish === undefined) return stamp === value.start;
	const first = math.min(value.start, value.finish);
	const last = math.max(value.start, value.finish);
	return stamp >= first && stamp <= last;
}

function DateRangePicker(props: CustomizedProps<Frame, DateRangePickerProps>) {
	const { year, month, value, onChange, onMonthChange, view, anchor, onAnchorChange, className, sx, id, ref } = props;
	const weekMode = view === "week";
	const anchorStamp = anchor ?? dateStamp(year, month, 1);
	const week = weekMode ? weekStamps(anchorStamp) : [];
	const { theme } = useTheme();
	const chrome = fieldChrome(controlMetrics(theme.density).height, theme.padding.calc(1));
	const pad = chrome.padX;
	const row = chrome.height;
	const lead = weekday(year, month, 1);
	const count = daysInMonth(year, month);
	const cells: Array<{ day?: number; stamp?: number; order: number }> = [];
	for (let index = 0; index < lead; index++) cells.push({ order: index });
	for (let day = 1; day <= count; day++) {
		cells.push({ day, stamp: dateStamp(year, month, day), order: lead + day - 1 });
	}

	const pick = (stamp: number) => {
		if (value.start === undefined || value.finish !== undefined) onChange({ start: stamp });
		else onChange(orderSpan(value.start, stamp));
	};
	const move = (delta: number) => {
		if (weekMode) {
			const moved = shiftDay(anchorStamp, delta * 7);
			onAnchorChange?.(moved);
			onMonthChange(math.floor(moved / 10000), math.floor(moved / 100) % 100);
			return;
		}
		const shifted = shiftMonth(year, month, delta);
		onMonthChange(shifted.year, shifted.month);
	};
	const title =
		weekMode && week.size() === 7 ? `${formatStamp(week[0])} – ${formatStamp(week[6])}` : `${MONTHS[month - 1] ?? ""} ${year}`;

	return (
		<SxHost
			tag="frame"
			key={id || "DateRangePicker"}
			hostRef={ref}
			base={{
				Size: new UDim2(1, 0, 0, 0),
				AutomaticSize: Enum.AutomaticSize.Y,
				BackgroundColor3: theme.palette.surface.paper,
				BorderSizePixel: 0,
			}}
			className={className}
			sx={sx}
		>
			<uipadding
				PaddingTop={new UDim(0, pad)}
				PaddingBottom={new UDim(0, pad)}
				PaddingLeft={new UDim(0, pad)}
				PaddingRight={new UDim(0, pad)}
			/>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, pad)} SortOrder={Enum.SortOrder.LayoutOrder} />
			<frame Size={new UDim2(1, 0, 0, row)} BackgroundTransparency={1} BorderSizePixel={0} LayoutOrder={0}>
				<textbutton
					Text={weekMode ? "Earlier" : "Prev"}
					Size={UDim2.fromOffset(weekMode ? 72 : 56, row)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					TextColor3={theme.palette.text.secondary}
					Font={theme.typography.fontFamilies.default}
					TextSize={theme.typography.fontSizes.caption}
					Event={{ Activated: () => move(-1) }}
				/>
				<textlabel
					Text={title}
					AnchorPoint={new Vector2(0.5, 0)}
					Position={UDim2.fromScale(0.5, 0)}
					Size={new UDim2(1, -(weekMode ? 72 : 56) * 2, 1, 0)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					TextTruncate={Enum.TextTruncate.AtEnd}
					TextWrapped={false}
					TextColor3={theme.palette.text.primary}
					Font={theme.typography.fontFamilies.semibold}
					TextSize={theme.typography.fontSizes.body}
				/>
				<textbutton
					Text={weekMode ? "Later" : "Next"}
					AnchorPoint={new Vector2(1, 0)}
					Position={UDim2.fromScale(1, 0)}
					Size={UDim2.fromOffset(weekMode ? 72 : 56, row)}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					TextColor3={theme.palette.text.secondary}
					Font={theme.typography.fontFamilies.default}
					TextSize={theme.typography.fontSizes.caption}
					Event={{ Activated: () => move(1) }}
				/>
			</frame>
			<textlabel
				Text={value.start === undefined ? "Choose a start and finish" : value.finish === undefined ? formatStamp(value.start) : `${formatStamp(value.start)} – ${formatStamp(value.finish)}`}
				Size={new UDim2(1, 0, 0, row)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				TextTruncate={Enum.TextTruncate.AtEnd}
				TextWrapped={false}
				TextXAlignment={Enum.TextXAlignment.Left}
				TextColor3={theme.palette.text.secondary}
				Font={theme.typography.fontFamilies.default}
				TextSize={theme.typography.fontSizes.caption}
				LayoutOrder={1}
			/>
			{weekMode ? (
				<frame Size={new UDim2(1, 0, 0, row * 2)} BackgroundTransparency={1} BorderSizePixel={0} LayoutOrder={2}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalAlignment={Enum.HorizontalAlignment.Center}
						Padding={new UDim(0, pad)}
						SortOrder={Enum.SortOrder.LayoutOrder}
					/>
					{week.map((stamp, index) => {
						const chosen = covers(stamp, value);
						const endpoint = stamp === value.start || stamp === value.finish;
						return (
							<textbutton
								key={`week-${stamp}`}
								Text={`${WEEKDAYS[index] ?? ""}\n${stamp % 100}`}
								LayoutOrder={index}
								Size={new UDim2(1 / 7, -math.ceil((pad * 6) / 7), 1, 0)}
								BackgroundColor3={chosen ? theme.palette.primary.main : theme.palette.surface.input}
								BackgroundTransparency={chosen && !endpoint ? 0.55 : 0}
								BorderSizePixel={0}
								TextColor3={endpoint ? theme.palette.primary.on : theme.palette.text.primary}
								Font={theme.typography.fontFamilies.default}
								TextSize={theme.typography.fontSizes.caption}
								TextWrapped={true}
								AutoButtonColor={false}
								Event={{ Activated: () => pick(stamp) }}
							>
								<uicorner CornerRadius={new UDim(0, 4)} />
							</textbutton>
						);
					})}
				</frame>
			) : (
			<frame Size={new UDim2(1, 0, 0, row * 7 + pad * 6)} BackgroundTransparency={1} BorderSizePixel={0} LayoutOrder={2}>
				<uigridlayout
					CellSize={new UDim2(1 / 7, -math.ceil((pad * 6) / 7), 0, row)}
					CellPadding={UDim2.fromOffset(pad, pad)}
					FillDirectionMaxCells={7}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				{WEEKDAYS.map((label, index) => (
					<textlabel
						key={`week-${index}`}
						Text={label}
						LayoutOrder={index}
						BackgroundTransparency={1}
						BorderSizePixel={0}
						TextColor3={theme.palette.text.secondary}
						Font={theme.typography.fontFamilies.default}
						TextSize={theme.typography.fontSizes.caption}
					/>
				))}
				{cells.map((cell) => {
					const stamp = cell.stamp;
					const chosen = stamp !== undefined && covers(stamp, value);
					const endpoint = stamp !== undefined && (stamp === value.start || stamp === value.finish);
					if (stamp === undefined || cell.day === undefined) {
						return (
							<frame
								key={`blank-${cell.order}`}
								LayoutOrder={10 + cell.order}
								BackgroundTransparency={1}
								BorderSizePixel={0}
							/>
						);
					}
					return (
						<textbutton
							key={`day-${stamp}`}
							Text={tostring(cell.day)}
							LayoutOrder={10 + cell.order}
							BackgroundColor3={chosen ? theme.palette.primary.main : theme.palette.surface.input}
							BackgroundTransparency={chosen && !endpoint ? 0.55 : 0}
							BorderSizePixel={0}
							TextColor3={endpoint ? theme.palette.primary.on : theme.palette.text.primary}
							Font={theme.typography.fontFamilies.default}
							TextSize={theme.typography.fontSizes.body}
							AutoButtonColor={false}
							Event={{ Activated: () => pick(stamp) }}
						>
							<uicorner CornerRadius={new UDim(0, 4)} />
						</textbutton>
					);
				})}
			</frame>
			)}
		</SxHost>
	);
}

export default DateRangePicker;
