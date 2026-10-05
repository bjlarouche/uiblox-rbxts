import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { breadcrumbCurrent } from "./breadcrumbItems";
import useBreadcrumbStyles from "./Breadcrumbs.styles";

export interface BreadcrumbItem {
	label: string;
	onActivated?: () => void;
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	separator?: string;
}

function Breadcrumbs(props: CustomizedProps<Frame, BreadcrumbsProps>) {
	const { items, separator = "/", className, sx, id, ref } = props;
	const styles = useBreadcrumbStyles();
	return (
		<frame key={id || "Breadcrumbs"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{items.map((item, index) => {
				const current = breadcrumbCurrent(index, items.size());
				return (
					<React.Fragment key={`${item.label}-${index}`}>
						{index > 0 && <textlabel {...styles.separator} Text={separator} LayoutOrder={index * 2} />}
						<textbutton
							{...cx<TextButton>(styles.item, current && styles.current)}
							Text={item.label}
							LayoutOrder={index * 2 + 1}
							Active={!current && item.onActivated !== undefined}
							Selectable={!current && item.onActivated !== undefined}
							Event={{ Activated: () => item.onActivated?.() }}
						/>
					</React.Fragment>
				);
			})}
		</frame>
	);
}

export default Breadcrumbs;
