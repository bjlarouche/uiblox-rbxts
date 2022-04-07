import { BoatTween } from "@rbxts/boat-tween";
import Roact from "@rbxts/roact";
import { hooked, useEffect, useRef, useState } from "@rbxts/roact-hooked";
import { DefaultTheme } from "theme";
import { Directions } from "ui/enums";
import { Shadow } from "ui/packages/shadow";
import ToastVariants from "../enums/ToastVariants";
import useToastStyles, { ACTIVE_POSITION, INACTIVE_POSITION } from "./Toast.styles";

export interface ToastProps {
	text: string;
	onDismiss: () => void;
	duration?: number;
	variant?: ToastVariants;
	toggledAt?: number;
}

const getToastColor = (variant: ToastVariants): Color3 => {
	switch (variant) {
		case ToastVariants.success:
			return DefaultTheme.palette.success.main;
		case ToastVariants.error:
			return DefaultTheme.palette.error.main;
		case ToastVariants.warning:
			return DefaultTheme.palette.warning.main;
		default:
			return DefaultTheme.options.constants.colors.backgroundUIContrast;
	}
};

const TWEEN_DURATION = 0.5;

const Toast = hooked<ToastProps>(({ text, onDismiss, duration = 4, variant = ToastVariants.default }) => {
	const { container, label, close } = useToastStyles();
	const [toastColor, setToastColor] = useState<Color3>(getToastColor(variant));
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
				Position: direction === Directions.In ? ACTIVE_POSITION : INACTIVE_POSITION,
			},
		});

		tween.Play();
		wait(TWEEN_DURATION);
	};

	useEffect(() => {
		const color = getToastColor(variant);
		setToastColor(color);
	}, [variant]);

	useEffect(() => {
		tween(Directions.In);
		wait(duration);
		tween(Directions.Out);

		if (onDismiss) {
			onDismiss();
		}
	}, []);

	return (
		<frame Key="Toast" Ref={frameRef} {...container} BackgroundColor3={toastColor}>
			<uicorner Key="Corner" CornerRadius={new UDim(0, DefaultTheme.shape.borderRadius)} />
			<Shadow />

			<textlabel Key="Label" {...label} Text={text} />
			<imagebutton
				Key="Close"
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
});

export default Toast;
