import React, { useState } from "@rbxts/react";
import { ControlSize, controlFade, CustomizedProps, focusRing, useTheme } from "theme";
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
	const { theme } = useTheme();
	const active = canActivate(disabled) && readOnly !== true;
	const [hover, setHover] = useState(0);
	const [focused, setFocused] = useState(0);
	const stars: number[] = [];
	for (let i = 1; i <= max; i++) stars.push(i);
	return (
		<SxHost
			tag="frame"
			key={id || "Rating"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, hover: hover > 0, focused: focused > 0 }}
			Event={{ MouseLeave: () => setHover(0) }}
		>
			<uilistlayout {...styles.list} />
			<>
			{stars.map((n) => {
				const filled = n <= value;
				const preview = active && hover > 0 && n <= hover && !filled;
				return (
					<imagebutton
						key={`Star-${n}`}
						{...styles.star}
						Image={tostring(filled || (active && hover >= n) ? Icons.StarFilled : Icons.Star)}
						ImageColor3={filled ? theme.palette.primary.main : preview ? theme.palette.primary.hover : theme.palette.text.secondary}
						ImageTransparency={disabled === true ? controlFade : 0}
						LayoutOrder={n}
						Active={active}
						Selectable={active}
						Event={{
							Activated: () => {
								const landed = ratingCommit(readOnly, onChange, n === value ? 0 : n);
								if (landed !== undefined && onChange !== undefined) onChange(landed);
							},
							MouseEnter: () => {
								if (active) setHover(n);
							},
							SelectionGained: () => {
								if (active) setFocused(n);
							},
							SelectionLost: () => setFocused(0),
						}}
					>
						{focused === n && active ? <uistroke {...focusRing(theme.palette.focus)} /> : undefined}
					</imagebutton>
				);
			})}
			</>
		</SxHost>
	);
}

export default Rating;
