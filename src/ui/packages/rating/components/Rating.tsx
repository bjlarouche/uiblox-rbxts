import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { canActivate } from "ui/packages/button/components/activation";
import useRatingStyles from "./Rating.styles";

export interface RatingProps {
	value: number;
	max?: number;
	disabled?: boolean;
	onChange: (value: number) => void;
}

function Rating(props: CustomizedProps<Frame, RatingProps>) {
	const { value, max = 5, disabled, onChange, className, sx, id, ref } = props;
	const styles = useRatingStyles({ disabled });
	const active = canActivate(disabled);
	const stars: number[] = [];
	for (let i = 1; i <= max; i++) stars.push(i);
	return (
		<frame key={id || "Rating"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
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
							if (active) onChange(n === value ? 0 : n);
						},
					}}
				/>
			))}
		</frame>
	);
}

export default Rating;
