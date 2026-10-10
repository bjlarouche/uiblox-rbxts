import React, { useEffect, useRef } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { useReducedMotion } from "hooks";
import { CustomizedProps, useTheme, WriteableStyle } from "theme";
import { SxHost } from "ui/packages/host";
import { Icon } from "ui/packages/icon";
import { IconButton } from "ui/packages/iconButton";
import { motionDuration } from "ui/packages/motion/duration";
import { playProperty } from "ui/packages/motion/play";
import { Shadow } from "ui/packages/shadow";
import ToastVariants from "../enums/ToastVariants";
import useToastStyles from "./Toast.styles";
import { toastGlyph, toastHold, toastWrap } from "./toastPlace";

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

function withoutPosition(style: object) {
	const body: { [key: string]: unknown } = {};
	for (const [key, value] of pairs(style as { [key: string]: unknown })) {
		if (key !== "Position") body[key] = value;
	}
	return body;
}

function Toast(props: CustomizedProps<Frame, ToastProps>) {
	const { text, onDismiss, duration = 4, action, onAction, toggledAt, className, sx, id, ref } = props;
	const { container, label, close, closeGlyph, mark, action: actionStyle, activePosition, inActivePosition } =
		useToastStyles(props);
	const { theme } = useTheme();
	const reduced = useReducedMotion();
	const frameRef = useRef<CanvasGroup>();
	const dismiss = useRef(onDismiss);
	dismiss.current = onDismiss;
	const timer = useRef<thread>();
	const exitTimer = useRef<thread>();
	const stopMotion = useRef<() => void>(() => {});
	const leaving = useRef(false);
	const font = theme.typography.fontFamilies.default ?? Enum.Font.SourceSans;
	const textSize = theme.typography.fontSizes.body ?? 14;
	const glyph = toastGlyph(props.variant);
	const actionSlot =
		(action !== undefined && action.size() > 0 ? theme.spacing.calc(8) : 0) +
		(theme.typography.fontSizes.caption ?? 12) +
		theme.padding.calc(1);
	const iconSize = (closeGlyph as WriteableStyle<ImageLabel>).Size?.X.Offset ?? 16;
	const lead = glyph !== undefined ? iconSize + theme.padding.calc(1) : 0;
	const box = theme.spacing.calc(20) - theme.padding.calc(4) - actionSlot - lead;
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
				Size: new UDim2(1, -(theme.padding.calc(4) + actionSlot + lead), 0, 0),
				AnchorPoint: new Vector2(0, 0),
				Position: new UDim2(0, pad + lead, 0, pad),
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Top,
			}
		: label;
	const active = (activePosition as WriteableStyle<Frame>).Position;
	const idle = (inActivePosition as WriteableStyle<Frame>).Position;
	const clock = useRef({
		active,
		idle,
		enter: theme.motion.slow,
		exit: theme.motion.default,
		reduced,
		duration,
	});
	clock.current = { active, idle, enter: theme.motion.slow, exit: theme.motion.default, reduced, duration };

	const leave = () => {
		if (leaving.current) return;
		leaving.current = true;
		if (timer.current) {
			task.cancel(timer.current);
			timer.current = undefined;
		}
		stopMotion.current();
		const frame = frameRef.current;
		const now = clock.current;
		if (frame && now.idle) {
			stopMotion.current = playProperty(frame, { Position: now.idle, GroupTransparency: 1 }, now.exit, now.reduced);
		}
		exitTimer.current = task.delay(motionDuration(now.exit, now.reduced), () => {
			exitTimer.current = undefined;
			dismiss.current();
		});
	};

	useEffect(() => {
		const frame = frameRef.current;
		if (!frame) return;
		leaving.current = false;
		const now = clock.current;
		if (now.idle) frame.Position = now.idle;
		frame.GroupTransparency = 1;
		stopMotion.current();
		if (now.active) {
			stopMotion.current = playProperty(
				frame,
				{ Position: now.active, GroupTransparency: 0 },
				now.enter,
				now.reduced,
			);
		}
		const hold = task.delay(toastHold(now.enter, now.duration, now.reduced), () => {
			timer.current = undefined;
			leave();
		});
		timer.current = hold;
		return () => {
			if (timer.current === hold) task.cancel(hold);
			if (exitTimer.current) task.cancel(exitTimer.current);
			exitTimer.current = undefined;
			stopMotion.current();
		};
	}, [duration, text, toggledAt, reduced]);

	return (
		<SxHost
			tag="canvasgroup"
			key={id || "Toast"}
			hostRef={(instance: CanvasGroup | undefined) => {
				frameRef.current = instance;
				if (instance && clock.current.idle) instance.Position = clock.current.idle;
				if (instance) instance.GroupTransparency = 1;
				if (ref === undefined) return;
				if (typeIs(ref, "function")) {
					ref(instance as unknown as Frame);
					return;
				}
				(ref as { current?: Frame }).current = instance as unknown as Frame;
			}}
			base={withoutPosition(boxStyle)}
			className={className}
			sx={sx}
		>
			<uicorner key="Corner" CornerRadius={new UDim(0, theme.shape.borderRadius)} />
			<Shadow />
			{wrap && <uipadding PaddingBottom={new UDim(0, pad)} />}
			{glyph !== undefined && (
				<Icon glyph={glyph} size={iconSize} tint={(closeGlyph as WriteableStyle<ImageLabel>).ImageColor3 as Color3} className={mark} />
			)}

			<textlabel key="Label" {...labelStyle} Text={text} />
			{action !== undefined && action.size() > 0 && (
				<textbutton
					key="Action"
					{...actionStyle}
					Text={action}
					Event={{
						Activated: () => {
							if (onAction) onAction();
							leave();
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
				onClick={leave}
			/>
		</SxHost>
	);
}

export default Toast;
