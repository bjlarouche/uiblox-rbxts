-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useProgressBarStyles = makeStyles(function(theme)
	return createStyles({
		container = {
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 110001,
		},
		outer = {
			Size = UDim2.new(1, 0, 1, 0),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 110001,
		},
		stroke = {
			Thickness = theme.options.constants.borders.divider,
			Color = theme.palette.text.primary,
		},
		inner = {
			Size = UDim2.new(1, -theme.options.constants.borders.divider * 2, 1, -theme.options.constants.borders.divider * 2),
			Position = UDim2.new(0.5, 0, 0.5, 0),
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ClipsDescendants = true,
			ZIndex = 110001,
		},
		fill = {
			Position = UDim2.new(0, 0, 0.5, 0),
			AnchorPoint = Vector2.new(0, 0.5),
			BackgroundColor3 = theme.palette.text.primary,
			BorderSizePixel = 0,
			ZIndex = 110001,
		},
		corner = {
			CornerRadius = UDim.new(0, theme.shape.borderRadius),
		},
	})
end)
local default = useProgressBarStyles
return {
	default = default,
}
