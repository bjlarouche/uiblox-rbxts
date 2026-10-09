import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { breadcrumbCurrent, breadcrumbHasGap, breadcrumbVisible } from "./breadcrumbItems";
import { SxHost } from "ui/packages/host";
import useBreadcrumbStyles from "./Breadcrumbs.styles";

export interface BreadcrumbItem {
	label: string;
	onActivated?: () => void;
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	separator?: string;
	maxItems?: number;
}

function Breadcrumbs(props: CustomizedProps<Frame, BreadcrumbsProps>) {
	const { items, separator = "/", maxItems, className, sx, id, ref } = props;
	const styles = useBreadcrumbStyles();
	const [opened, setOpened] = useState(false);
	const gap = breadcrumbHasGap(items.size(), maxItems);
	const visible = breadcrumbVisible(items, opened || !gap ? undefined : maxItems);
	return (
		<SxHost tag="frame" key={id || "Breadcrumbs"} hostRef={ref} base={opened ? styles.opened : styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} Wraps={opened} />
			<>
			{visible.map((entry, order) => {
				const current = !entry.ellipsis && breadcrumbCurrent(entry.index, items.size());
				const item = entry.ellipsis ? undefined : items[entry.index];
				return (
					<React.Fragment key={`${entry.label}-${order}`}>
						{order > 0 && <textlabel {...styles.separator} Text={separator} LayoutOrder={order * 2} />}
						{entry.ellipsis ? (
							<textbutton
								{...styles.item}
								Text="…"
								LayoutOrder={order * 2 + 1}
								Event={{ Activated: () => setOpened(true) }}
							>
								<uisizeconstraint {...styles.cap} />
							</textbutton>
						) : (
							<textbutton
								{...cx<TextButton>(styles.item, current && styles.current)}
								Text={entry.label}
								LayoutOrder={order * 2 + 1}
								Active={!current && item?.onActivated !== undefined}
								Selectable={!current && item?.onActivated !== undefined}
								Event={{ Activated: () => item?.onActivated?.() }}
							>
								<uisizeconstraint {...styles.cap} />
							</textbutton>
						)}
					</React.Fragment>
				);
			})}
			</>
		</SxHost>
	);
}

export default Breadcrumbs;
