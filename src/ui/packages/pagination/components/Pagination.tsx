import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { pageRange } from "./pageRange";
import usePaginationStyles from "./Pagination.styles";

export interface PaginationProps {
	count: number;
	page: number;
	disabled?: boolean;
	siblingCount?: number;
	boundaryCount?: number;
	onChange: (page: number) => void;
}

function Pagination(props: CustomizedProps<Frame, PaginationProps>) {
	const { count, page, disabled, siblingCount, boundaryCount, onChange, className, sx, id, ref } = props;
	const styles = usePaginationStyles();
	const tokens = pageRange(count, page, siblingCount, boundaryCount);
	return (
		<frame key={id || "Pagination"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{tokens.map((item, index) =>
				item === "ellipsis" ? (
					<textlabel key={`e-${index}`} {...styles.ellipsis} LayoutOrder={index} />
				) : (
					<textbutton
						key={tostring(item)}
						{...cx<TextButton>(styles.page, item === page && styles.selected)}
						Text={tostring(item)}
						LayoutOrder={index}
						Active={disabled !== true}
						Selectable={disabled !== true}
						Event={{ Activated: () => disabled !== true && item !== page && onChange(item) }}
					>
						<uicorner {...styles.corner} />
					</textbutton>
				),
			)}
		</frame>
	);
}

export default Pagination;
