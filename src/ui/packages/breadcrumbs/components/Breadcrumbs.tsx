import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { breadcrumbCurrent, breadcrumbVisible } from "./breadcrumbItems";
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
	const visible = breadcrumbVisible(items, maxItems);
	return (
		<frame key={id || "Breadcrumbs"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{visible.map((entry, order) => {
				const current = !entry.ellipsis && breadcrumbCurrent(entry.index, items.size());
				const item = entry.ellipsis ? undefined : items[entry.index];
				return (
					<React.Fragment key={`${entry.label}-${order}`}>
						{order > 0 && <textlabel {...styles.separator} Text={separator} LayoutOrder={order * 2} />}
						{entry.ellipsis ? (
							<textlabel {...styles.separator} Text="…" LayoutOrder={order * 2 + 1} />
						) : (
							<textbutton
								{...cx<TextButton>(styles.item, current && styles.current)}
								Text={entry.label}
								LayoutOrder={order * 2 + 1}
								Active={!current && item?.onActivated !== undefined}
								Selectable={!current && item?.onActivated !== undefined}
								Event={{ Activated: () => item?.onActivated?.() }}
							/>
						)}
					</React.Fragment>
				);
			})}
		</frame>
	);
}

export default Breadcrumbs;
