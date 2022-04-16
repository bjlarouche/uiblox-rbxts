import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { InputProps } from "./Input";

const useInputStyles = makeStyles<InputProps>(
	(
		theme,
		{
			color = "primary",
			margin = "none",
			variant = "standard",
			width = new UDim(0, theme.spacing.calc(8)),
			helperText,
			clearsTextOnFocus = false,
		},
	) => {
		const makeRootStyles = () => {
			const defaultStyles: WriteableStyle<Frame> = {};
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;

			defaultStyles.Size = new UDim2(
				width.Scale,
				width.Offset,
				0,
				helperText !== undefined ? theme.spacing.calc(4) : theme.spacing.calc(2),
			);

			// Increase size vertically to account for margin
			switch (margin) {
				case "none":
					break;
				case "dense":
					defaultStyles.Size = new UDim2(
						defaultStyles.Size.X.Scale,
						defaultStyles.Size.X.Offset,
						defaultStyles.Size.Y.Scale,
						defaultStyles.Size.Y.Offset + theme.padding.calc(2),
					);
					break;
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

		const makeBoxStyles = () => {
			const defaultStyles: WriteableStyle<TextBox> = {};

			defaultStyles.BackgroundColor3 =
				color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary;
			defaultStyles.PlaceholderColor3 = theme.palette.text.secondary;

			defaultStyles.Position = new UDim2(0, 0, 0, 0);
			defaultStyles.Size = new UDim2(1, 0, 0, theme.spacing.calc(2));

			switch (variant) {
				case "filled":
					defaultStyles.BackgroundTransparency = 0;
					defaultStyles.BorderSizePixel = 0;
					break;
				case "outlined":
					defaultStyles.TextColor3 = theme.palette.text.primary;
					defaultStyles.BackgroundTransparency = 1;
					defaultStyles.BorderSizePixel = theme.options.constants.borders.default;
					break;
				case "standard":
					defaultStyles.TextColor3 = theme.palette.text.primary;
					defaultStyles.BackgroundTransparency = 1;
					defaultStyles.BorderSizePixel = 0;
					break;
				default:
					defaultStyles.BackgroundTransparency = 0;
					defaultStyles.BorderSizePixel = 0;
					break;
			}

			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left;
			defaultStyles.ClearTextOnFocus = clearsTextOnFocus;

			defaultStyles.ZIndex = 12000;

			return defaultStyles;
		};

		const makeMarginStyles = () => {
			const defaultStyles: WriteableStyle<Frame> = {};
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;

			// Center in root
			defaultStyles.Position = new UDim2(0.5, 0, 0.5, 0);
			defaultStyles.AnchorPoint = new Vector2(0.5, 0.5);

			// Margin controls vertical spacing around the input component
			switch (margin) {
				case "none":
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(0), 1, 0);
					break;
				case "dense":
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(2), 1, -theme.padding.calc(2));
					break;
				case "normal":
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4));
					break;
				default:
					defaultStyles.Size = new UDim2(1, -theme.padding.calc(0), 1, 0);
					break;
			}

			defaultStyles.ZIndex = 11000;

			return defaultStyles;
		};

		return createStyles({
			root: makeRootStyles(),
			font: {
				TextSize: theme.typography.fontSizes.button,
				Font: theme.typography.fontFamilies.default,
			} as WriteableStyle<TextLabel>,
			margin: makeMarginStyles(),
			box: makeBoxStyles(),
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
				BackgroundColor3: theme.palette.error.main,
				BorderColor3: theme.palette.error.main,
			} as WriteableStyle<Frame>,
			errorColorText: {
				TextColor3: theme.palette.error.main,
				BackgroundColor3: theme.palette.error.main,
				BorderColor3: theme.palette.error.main,
			} as WriteableStyle<TextLabel>,
			divider: {
				Position: new UDim2(0, 0, 0, theme.spacing.calc(2)),
				BackgroundColor3: color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary,
				ZIndex: 11000,
			} as WriteableStyle<Frame>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary,
				Transparency: 0,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
		});
	},
);

export default useInputStyles;
