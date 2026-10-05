import React, { useState } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { accordionGlyph, accordionOpen } from "./accordionOpen";
import useAccordionStyles from "./Accordion.styles";

export interface AccordionProps {
	title: string;
	open?: boolean;
	defaultOpen?: boolean;
	disabled?: boolean;
	onChange?: (open: boolean) => void;
	children?: React.ReactNode;
}

function Accordion(props: CustomizedProps<Frame, AccordionProps>) {
	const { title, open: controlled, defaultOpen, disabled, onChange, children, className, sx, id, ref } = props;
	const [localOpen, setLocalOpen] = useState(defaultOpen === true);
	const open = accordionOpen(localOpen, controlled);
	const styles = useAccordionStyles({ open, disabled });

	const toggle = () => {
		if (disabled === true) return;
		const nextOpen = !open;
		if (controlled === undefined) setLocalOpen(nextOpen);
		onChange?.(nextOpen);
	};

	return (
		<frame key={id || "Accordion"} ref={ref} {...styles.root} {...className} {...sx}>
			<uicorner {...styles.corner} />
			<uilistlayout {...styles.list} />
			<textbutton key="Header" {...styles.header} Event={{ Activated: toggle }}>
				<uipadding {...styles.padding} />
				<textlabel key="Title" {...styles.title} Text={title} />
				<imagelabel
					key="Icon"
					{...styles.icon}
					Image={accordionGlyph(open) === "expanded" ? Icons.Expanded : Icons.Collapsed}
				/>
			</textbutton>
			<frame key="Body" {...styles.body}>
				<uipadding {...styles.padding} />
				{children}
			</frame>
		</frame>
	);
}

export default Accordion;
