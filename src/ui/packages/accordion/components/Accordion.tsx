import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { Collapse } from "ui/packages/collapse";
import { accordionNote } from "./accordionNote";
import { accordionGlyph, accordionOpen } from "./accordionOpen";
import useAccordionStyles from "./Accordion.styles";

export interface AccordionProps {
	title: string;
	note?: string;
	open?: boolean;
	defaultOpen?: boolean;
	disabled?: boolean;
	square?: boolean;
	onChange?: (open: boolean) => void;
	children?: React.ReactNode;
}

function Accordion(props: CustomizedProps<Frame, AccordionProps>) {
	const { title, note, open: controlled, defaultOpen, disabled, square, onChange, children, className, sx, id, ref } = props;
	const [localOpen, setLocalOpen] = useState(defaultOpen === true);
	const [hovering, setHovering] = useState(false);
	const open = accordionOpen(localOpen, controlled);
	const summary = accordionNote(note);
	const styles = useAccordionStyles({ open, disabled });

	const toggle = () => {
		if (disabled === true) return;
		const nextOpen = !open;
		if (controlled === undefined) setLocalOpen(nextOpen);
		onChange?.(nextOpen);
	};

	return (
		<SxHost tag="frame" key={id || "Accordion"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			{square !== true && <uicorner {...styles.corner} />}
			<uistroke {...styles.stroke} />
			<uilistlayout {...styles.list} />
			<textbutton
				key="Header"
				{...cx(styles.header, hovering && disabled !== true && styles.hover)}
				Event={{
					Activated: toggle,
					MouseEnter: () => setHovering(true),
					MouseLeave: () => setHovering(false),
				}}
			>
				<uipadding {...styles.tail} />
				{summary === undefined ? (
					<textlabel key="Title" {...styles.title} Text={title} />
				) : (
					<frame key="Copy" {...styles.copy}>
						<uilistlayout FillDirection={Enum.FillDirection.Vertical} SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0, 0)} />
						<textlabel key="Title" {...styles.title} Position={new UDim2(0, 0, 0, 0)} Size={new UDim2(1, 0, 0, 0)} Text={title} LayoutOrder={1} />
						<textlabel key="Note" {...styles.note} Text={summary} LayoutOrder={2} />
					</frame>
				)}
				<imagelabel
					key="Icon"
					{...styles.icon}
					Image={accordionGlyph(open) === "expanded" ? Icons.Expanded : Icons.Collapsed}
				/>
			</textbutton>
			<Collapse key="Body" open={open} className={styles.body}>
				<frame key="Inset" {...styles.band}>
					<uipadding {...styles.tail} />
					{children}
				</frame>
			</Collapse>
		</SxHost>
	);
}

export default Accordion;
