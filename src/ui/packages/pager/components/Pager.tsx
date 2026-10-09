import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import usePagerStyles from "./Pager.styles";
import { pagerLabel, pagerPlace, pagerStep } from "./pagerStep";

export interface PagerProps {
	index: number;
	count: number;
	disabled?: boolean;
	onChange: (index: number) => void;
	children?: React.ReactNode;
}

function Pager(props: CustomizedProps<Frame, PagerProps>) {
	const { index, count, disabled, onChange, children, className, sx, id, ref } = props;
	const styles = usePagerStyles();
	const place = pagerPlace(index, count);
	const back = pagerStep(index, count, -1);
	const forward = pagerStep(index, count, 1);
	const groupOff = disabled === true;
	return (
		<SxHost tag="frame" key={id || "Pager"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled: groupOff }}>
			<uilistlayout {...styles.list} />
			<frame key="Bar" {...styles.bar} LayoutOrder={0}>
				<uilistlayout {...styles.barList} />
				<textbutton
					key="Back"
					{...styles.button}
					Text="Back"
					TextTransparency={groupOff || back === place ? 0.5 : 0}
					Active={canActivate(groupOff || back === place)}
					LayoutOrder={0}
					Event={{
						Activated: () => {
							if (!groupOff && back !== place) onChange(back);
						},
					}}
				/>
				<textlabel key="Count" {...styles.label} Text={pagerLabel(index, count)} LayoutOrder={1}>
					<uisizeconstraint {...styles.labelCap} />
				</textlabel>
				<textbutton
					key="Next"
					{...styles.button}
					Text="Next"
					TextTransparency={groupOff || forward === place ? 0.5 : 0}
					Active={canActivate(groupOff || forward === place)}
					LayoutOrder={2}
					Event={{
						Activated: () => {
							if (!groupOff && forward !== place) onChange(forward);
						},
					}}
				/>
			</frame>
			<frame key="Body" {...styles.body} LayoutOrder={1}>
				{children}
			</frame>
		</SxHost>
	);
}

export default Pager;
