import { controlMetrics, createStyles, componentStyles, WriteableStyle } from "theme";
import { InputProps } from "./Input";
import { inputInsets } from "./inputInsets";

const useInputStyles = componentStyles<InputProps & { focused?: boolean }>("Input", 
	(
		theme,
		{
			color = "primary",
			margin = "none",
			variant = "standard",
			width = new UDim(0, theme.spacing.calc(8)),
			helperText,
			clearsTextOnFocus = false,
			startAdornment,
			endAdornment,
			focused = false,
			hasError = false,
			size,
		},
	) => {
		const metrics = controlMetrics(theme.density, size);
		const hasStart = startAdornment !== undefined;
		const hasEnd = endAdornment !== undefined;
		const icon = metrics.icon;
		const gap = theme.padding.calc(1);
		const insets = inputInsets(hasStart, hasEnd, icon, gap);
		const fieldHeight = metrics.height + (variant === "standard" ? 0 : theme.padding.calc(1));
		const accent = color === "primary" ? theme.palette.primary.main : theme.palette.text.primary;
		const focusAccent = hasError ? theme.palette.status.error.main : theme.palette.focus;

		const makeRootStyles = () => {
			const defaultStyles: WriteableStyle<Frame> = {};
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;

			defaultStyles.Size = new UDim2(
				width.Scale,
				width.Offset,
				0,
				helperText !== undefined ? fieldHeight + metrics.height : fieldHeight,
			);

			switch (margin) {
				case "dense":
				case "normal":
					defaultStyles.Size = new UDim2(
						defaultStyles.Size.X.Scale,
						defaultStyles.Size.X.Offset,
						defaultStyles.Size.Y.Scale,
						defaultStyles.Size.Y.Offset + theme.padding.calc(2),
					);
					break;
				default:
					break;
			}

			defaultStyles.ZIndex = 10000;

			return defaultStyles;
		};

		const makeShellStyles = () => {
			const shell: WriteableStyle<Frame> = {
				Size: new UDim2(1, 0, 0, fieldHeight),
				Position: new UDim2(0, 0, 0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ZIndex: 11000,
			};

			if (variant === "filled") {
				shell.BackgroundColor3 = theme.palette.surface.input;
				shell.BackgroundTransparency = 0;
			} else if (variant === "outlined") {
				shell.BackgroundColor3 = theme.palette.surface.input;
				shell.BackgroundTransparency = 0.35;
			}

			return shell;
		};

		const makeBoxStyles = () => {
			const defaultStyles: WriteableStyle<TextBox> = {};

			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;
			defaultStyles.PlaceholderColor3 = theme.palette.text.secondary;
			defaultStyles.TextColor3 = theme.palette.text.primary;
			defaultStyles.Position = new UDim2(0, insets.left, 0, 0);
			defaultStyles.Size = new UDim2(1, -(insets.left + insets.right), 1, 0);
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left;
			defaultStyles.TextTruncate = Enum.TextTruncate.AtEnd;
			defaultStyles.ClearTextOnFocus = clearsTextOnFocus;
			defaultStyles.ZIndex = 12000;

			return defaultStyles;
		};

		const makeMarginStyles = () => {
			const defaultStyles: WriteableStyle<Frame> = {};
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;
			defaultStyles.Position = new UDim2(0.5, 0, 0.5, 0);
			defaultStyles.AnchorPoint = new Vector2(0.5, 0.5);

			switch (margin) {
				case "dense":
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(2), 1, -theme.padding.calc(2));
					break;
				case "normal":
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4));
					break;
				default:
					defaultStyles.Size = new UDim2(1, 0, 1, 0);
					break;
			}

			defaultStyles.ZIndex = 11000;

			return defaultStyles;
		};

		const slot = (side: "start" | "end"): WriteableStyle<Frame> => ({
			Size: new UDim2(0, icon, 0, icon),
			Position: new UDim2(side === "start" ? 0 : 1, side === "start" ? gap : -gap, 0.5, 0),
			AnchorPoint: new Vector2(side === "start" ? 0 : 1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 13000,
		});

		return createStyles({
			root: makeRootStyles(),
			font: {
				TextSize: metrics.font,
				Font: theme.typography.fontFamilies.default,
			} as WriteableStyle<TextLabel>,
			margin: makeMarginStyles(),
			shell: makeShellStyles(),
			box: makeBoxStyles(),
			startSlot: slot("start"),
			endSlot: slot("end"),
			helper: {
				Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
				Position: new UDim2(0, 0, 1, 0),
				AnchorPoint: new Vector2(0, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				TextColor3: theme.palette.text.secondary,
				TextXAlignment: Enum.TextXAlignment.Left,
				ZIndex: 11000,
			} as WriteableStyle<TextLabel>,
			errorColorFrame: {
				BackgroundColor3: theme.palette.status.error.main,
				BorderColor3: theme.palette.status.error.main,
			} as WriteableStyle<Frame>,
			errorColorText: {
				TextColor3: theme.palette.status.error.main,
			} as WriteableStyle<TextLabel>,
			divider: {
				Position: new UDim2(0, 0, 0, fieldHeight),
				BackgroundColor3: accent,
				ZIndex: 11000,
			} as WriteableStyle<Frame>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: hasError ? theme.palette.status.error.main : focused ? focusAccent : accent,
				Transparency: focused || hasError ? 0 : 0.45,
				Thickness: focused ? 1.5 : 1,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
		});
	},
);

export default useInputStyles;
