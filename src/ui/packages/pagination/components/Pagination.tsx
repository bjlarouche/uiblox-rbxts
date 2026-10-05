import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { pageRange } from "./pageRange";
import usePaginationStyles from "./Pagination.styles";

export interface PaginationProps {
	count: number;
	page: number;
	disabled?: boolean;
	onChange: (page: number) => void;
}

function Pagination(props: CustomizedProps<Frame, PaginationProps>) {
	const { count, page, disabled, onChange, className, sx, id, ref } = props;
	const styles = usePaginationStyles();
	return (
		<frame key={id || "Pagination"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{pageRange(count).map((item) => (
				<textbutton
					key={tostring(item)}
					{...cx<TextButton>(styles.page, item === page && styles.selected)}
					Text={tostring(item)}
					Active={disabled !== true}
					Selectable={disabled !== true}
					Event={{ Activated: () => disabled !== true && item !== page && onChange(item) }}
				>
					<uicorner {...styles.corner} />
				</textbutton>
			))}
		</frame>
	);
}

export default Pagination;
