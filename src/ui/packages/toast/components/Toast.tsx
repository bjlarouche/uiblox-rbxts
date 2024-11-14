import { BoatTween } from "@rbxts/boat-tween";
import Roact from "@rbxts/roact";
import { markPureComponent, useEffect, useRef } from "@rbxts/roact-hooked";
import { DefaultTheme, WriteableStyle } from "theme";
import { Directions } from "ui/enums";
import { Shadow } from "ui/packages/shadow";
import ToastVariants from "../enums/ToastVariants";
import useToastStyles from "./Toast.styles";

export interface ToastProps {
	text: string;
	onDismiss: () => void;
	duration?: number;
	variant?: ToastVariants;
	toggledAt?: number;
}

const TWEEN_DURATION = 0.5;

function Toast(props: ToastProps) {
	const { text, onDismiss, duration = 4 } = props;
	const { container, label, close, activePosition, inActivePosition } = useToastStyles(props);
	const frameRef = useRef<Frame>();

	const tween = (direction: Directions) => {
		const frame = frameRef.getValue();
		if (!frame) return;

		const tween = BoatTween.Create(frame, {
			Time: TWEEN_DURATION,
			DelayTime: 0,

			EasingStyle: "Linear",
			EasingDirection: "InOut",

			RepeatCount: 0,
			Reverses: false,

			StepType: "Stepped",

			Goal: {
				Position:
					direction === Directions.In
						? (activePosition as WriteableStyle<Frame>).Position
						: (inActivePosition as WriteableStyle<Frame>).Position,
			},
		});

		tween.Play();
		wait(TWEEN_DURATION);
	};

	useEffect(() => {
		tween(Directions.In);
		wait(duration);
		tween(Directions.Out);

		if (onDismiss) {
			onDismiss();
		}
	}, []);

	return (
		<frame Ref={frameRef} {...container}>
			<uicorner CornerRadius={new UDim(0, DefaultTheme.shape.borderRadius)} />
			<Shadow />

			<textlabel {...label} Text={text} />
			<imagebutton
				{...close}
				Event={{
					MouseButton1Click: () => {
						tween(Directions.Out);
						if (onDismiss) {
							onDismiss();
						}
					},
				}}
			/>
		</frame>
	);
}

export default markPureComponent(Toast);
