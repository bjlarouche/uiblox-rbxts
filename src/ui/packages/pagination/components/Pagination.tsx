import React from "@rbxts/react";
import { ControlSize, cx, CustomizedProps } from "theme";
import { pageRange } from "./pageRange";
import { SxHost } from "ui/packages/host";
import usePaginationStyles, { PaginationVariant } from "./Pagination.styles";

export interface PaginationProps {
	count: number;
	page: number;
	disabled?: boolean;
	siblingCount?: number;
	boundaryCount?: number;
	size?: ControlSize;
	variant?: PaginationVariant;
	onChange: (page: number) => void;
}

function Pagination(props: CustomizedProps<Frame, PaginationProps>) {
	const { count, page, disabled, siblingCount, boundaryCount, size, variant, onChange, className, sx, id, ref } = props;
	const styles = usePaginationStyles({ size, variant });
	const tokens = pageRange(count, page, siblingCount, boundaryCount);
	return (
		<SxHost tag="frame" key={id || "Pagination"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.list} />
			<>
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
						{variant === "outlined" && <uistroke {...(item === page ? styles.selectedStroke : styles.stroke)} />}
					</textbutton>
				),
			)}
			</>
		</SxHost>
	);
}

export default Pagination;
