-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useInputStyles = makeStyles(function(theme, _param)
	local color = _param.color
	if color == nil then
		color = "primary"
	end
	local margin = _param.margin
	if margin == nil then
		margin = "none"
	end
	local variant = _param.variant
	if variant == nil then
		variant = "standard"
	end
	local width = _param.width
	if width == nil then
		width = UDim.new(0, theme.spacing.calc(8))
	end
	local helperText = _param.helperText
	local clearsTextOnFocus = _param.clearsTextOnFocus
	if clearsTextOnFocus == nil then
		clearsTextOnFocus = false
	end
	local makeRootStyles = function()
		local defaultStyles = {}
		defaultStyles.BackgroundTransparency = 1
		defaultStyles.BorderSizePixel = 0
		defaultStyles.Size = UDim2.new(width.Scale, width.Offset, 0, if helperText ~= nil then theme.spacing.calc(4) else theme.spacing.calc(2))
		-- Increase size vertically to account for margin
		repeat
			if margin == "none" then
				break
			end
			if margin == "dense" then
				defaultStyles.Size = UDim2.new(defaultStyles.Size.X.Scale, defaultStyles.Size.X.Offset, defaultStyles.Size.Y.Scale, defaultStyles.Size.Y.Offset + theme.padding.calc(2))
				break
			end
			if margin == "normal" then
				defaultStyles.Size = UDim2.new(defaultStyles.Size.X.Scale, defaultStyles.Size.X.Offset, defaultStyles.Size.Y.Scale, defaultStyles.Size.Y.Offset + theme.padding.calc(2))
				break
			end
			break
		until true
		defaultStyles.ZIndex = 10000
		return defaultStyles
	end
	local makeBoxStyles = function()
		local defaultStyles = {}
		defaultStyles.BackgroundColor3 = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary
		defaultStyles.PlaceholderColor3 = theme.palette.text.secondary
		defaultStyles.Position = UDim2.new(0, 0, 0, 0)
		defaultStyles.Size = UDim2.new(1, 0, 0, theme.spacing.calc(2))
		repeat
			if variant == "filled" then
				defaultStyles.BackgroundTransparency = 0
				defaultStyles.BorderSizePixel = 0
				break
			end
			if variant == "outlined" then
				defaultStyles.TextColor3 = theme.palette.text.primary
				defaultStyles.BackgroundTransparency = 1
				defaultStyles.BorderSizePixel = theme.options.constants.borders.default
				break
			end
			if variant == "standard" then
				defaultStyles.TextColor3 = theme.palette.text.primary
				defaultStyles.BackgroundTransparency = 1
				defaultStyles.BorderSizePixel = 0
				break
			end
			defaultStyles.BackgroundTransparency = 0
			defaultStyles.BorderSizePixel = 0
			break
		until true
		defaultStyles.TextXAlignment = Enum.TextXAlignment.Left
		defaultStyles.ClearTextOnFocus = clearsTextOnFocus
		defaultStyles.ZIndex = 12000
		return defaultStyles
	end
	local makeMarginStyles = function()
		local defaultStyles = {}
		defaultStyles.BackgroundTransparency = 1
		defaultStyles.BorderSizePixel = 0
		-- Center in root
		defaultStyles.Position = UDim2.new(0.5, 0, 0.5, 0)
		defaultStyles.AnchorPoint = Vector2.new(0.5, 0.5)
		-- Margin controls vertical spacing around the input component
		repeat
			if margin == "none" then
				defaultStyles.Size = UDim2.new(1, -theme.padding.calc(0), 1, 0)
				break
			end
			if margin == "dense" then
				defaultStyles.Size = UDim2.new(1, -theme.padding.calc(2), 1, -theme.padding.calc(2))
				break
			end
			if margin == "normal" then
				defaultStyles.Size = UDim2.new(1, -theme.padding.calc(4), 1, -theme.padding.calc(4))
				break
			end
			defaultStyles.Size = UDim2.new(1, -theme.padding.calc(0), 1, 0)
			break
		until true
		defaultStyles.ZIndex = 11000
		return defaultStyles
	end
	return createStyles({
		root = makeRootStyles(),
		font = {
			TextSize = theme.typography.fontSizes.button,
			Font = theme.typography.fontFamilies.default,
		},
		margin = makeMarginStyles(),
		box = makeBoxStyles(),
		helper = {
			Size = UDim2.new(1, 0, 0, theme.spacing.calc(2)),
			Position = UDim2.new(0, 0, 1, 0),
			AnchorPoint = Vector2.new(0, 1),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			TextColor3 = theme.palette.text.secondary,
			TextXAlignment = Enum.TextXAlignment.Left,
			ZIndex = 11000,
		},
		errorColorFrame = {
			BackgroundColor3 = theme.palette.error.main,
			BorderColor3 = theme.palette.error.main,
		},
		errorColorText = {
			TextColor3 = theme.palette.error.main,
			BackgroundColor3 = theme.palette.error.main,
			BorderColor3 = theme.palette.error.main,
		},
		divider = {
			Position = UDim2.new(0, 0, 0, theme.spacing.calc(2)),
			BackgroundColor3 = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary,
			ZIndex = 11000,
		},
		corner = {
			CornerRadius = UDim.new(0, theme.shape.borderRadius),
		},
		stroke = {
			Color = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary,
			Transparency = 0,
			ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
		},
	})
end)
local default = useInputStyles
return {
	default = default,
}
