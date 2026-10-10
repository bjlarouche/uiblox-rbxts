import { BoatTween } from "@rbxts/boat-tween";
import React, { useEffect, useRef } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { CustomizedProps, DEFAULT_THEME, useTheme, WriteableStyle } from "theme";
import { Directions } from "ui/enums";
import { SxHost } from "ui/packages/host";
import { IconButton } from "ui/packages/iconButton";
import { Shadow } from "ui/packages/shadow";
import ToastVariants from "../enums/ToastVariants";
import useToastStyles from "./Toast.styles";
import { toastWrap } from "./toastPlace";

export interface ToastProps {
	text: string;
	onDismiss: () => void;
	duration?: number;
	variant?: ToastVariants;
	toggledAt?: number;
	action?: string;
	onAction?: () => void;
	edge?: "top" | "bottom";
}

const TWEEN_DURATION = 0.5;

function Toast(props: CustomizedProps<Frame, ToastProps>) {
	const { text, onDismiss, duration = 4, action, onAction, className,
		sx, id, ref } = props;
	const { container, label, close, closeGlyph, action: actionStyle, activePosition, inActivePosition } = useToastStyles(props);
	const { theme } = useTheme();
	const frameRef = useRef<Frame>();
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textSize = theme.typography.fontSizes.body ?? 14;
	const actionSlot =
		(action !== undefined && action.size() > 0 ? theme.spacing.calc(8) : 0) +
		(theme.typography.fontSizes.caption ?? 12) +
		theme.padding.calc(1);
	const box = theme.spacing.calc(20) - theme.padding.calc(4) - actionSlot;
	const bounds = TextService.GetTextSize(text, textSize, font, new Vector2(10000, 100));
	const wrap = toastWrap(bounds.X, box);
	const pad = theme.padding.calc(2);
	const boxStyle = wrap ? { ...container, AutomaticSize: Enum.AutomaticSize.Y } : container;
	const labelStyle = wrap
		? {
				...label,
				TextWrapped: true,
				TextTruncate: Enum.TextTruncate.None,
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, -(theme.padding.calc(4) + actionSlot), 0, 0),
				AnchorPoint: new Vector2(0, 0),
				Position: new UDim2(0, pad, 0, pad),
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Top,
			}
		: label;

	const tween = (direction: Directions) => {
		const frame = frameRef.current;
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
		const thread = task.spawn(() => {
			tween(Directions.In);
			wait(duration);
			tween(Directions.Out);

			if (onDismiss) {
				onDismiss();
			}
		});
		return () => task.cancel(thread);
	}, []);

	return (
		<SxHost
			tag="frame"
			key={id || "Toast"}
			hostRef={(instance: Frame | undefined) => {
				frameRef.current = instance;
				if (ref === undefined) return;
				if (typeIs(ref, "function")) {
					ref(instance as Frame);
					return;
				}
				(ref as { current?: Frame }).current = instance;
			}}
			base={boxStyle}
			className={className}
			sx={sx}
		>
			<uicorner  key="Corner"  CornerRadius={new UDim(0, DEFAULT_THEME.shape.borderRadius)} />
			<Shadow />
			{wrap && <uipadding PaddingBottom={new UDim(0, pad)} />}

			<textlabel key="Label" {...labelStyle} Text={text} />
			{action !== undefined && action.size() > 0 && (
				<textbutton
					key="Action"
					{...actionStyle}
					Text={action}
					Event={{
						Activated: () => {
							if (onAction) onAction();
							tween(Directions.Out);
							if (onDismiss) onDismiss();
						},
					}}
				/>
			)}
			<IconButton
				id="Close"
				glyph="close"
				iconSize={(closeGlyph as WriteableStyle<ImageLabel>).Size?.X.Offset ?? 16}
				tint={(closeGlyph as WriteableStyle<ImageLabel>).ImageColor3 as Color3}
				className={close}
				onClick={() => {
					tween(Directions.Out);
					if (onDismiss) {
						onDismiss();
					}
				}}
			/>
		</SxHost>
	);
}

export default Toast;
