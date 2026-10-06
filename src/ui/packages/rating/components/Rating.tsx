import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import { ratingCommit } from "./ratingCommit";
import useRatingStyles from "./Rating.styles";

export interface RatingProps {
	value: number;
	max?: number;
	size?: ControlSize;
	disabled?: boolean;
	readOnly?: boolean;
	onChange?: (value: number) => void;
}

function Rating(props: CustomizedProps<Frame, RatingProps>) {
	const { value, max = 5, size = "medium", disabled, readOnly, onChange, className, sx, id, ref } = props;
	const styles = useRatingStyles({ disabled, size });
	const active = canActivate(disabled) && readOnly !== true;
	const stars: number[] = [];
	for (let i = 1; i <= max; i++) stars.push(i);
	return (
		<SxHost tag="frame" key={id || "Rating"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.list} />
			<>
			{stars.map((n) => (
				<imagebutton
					key={`Star-${n}`}
					{...styles.star}
					Image={tostring(n <= value ? Icons.StarFilled : Icons.Star)}
					LayoutOrder={n}
					Active={active}
					Selectable={active}
					Event={{
						Activated: () => {
							const landed = ratingCommit(readOnly, onChange, n === value ? 0 : n);
							if (landed !== undefined && onChange !== undefined) onChange(landed);
						},
					}}
				/>
			))}
			</>
		</SxHost>
	);
}

export default Rating;
