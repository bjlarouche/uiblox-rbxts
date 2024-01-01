-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local DefaultTheme = _theme.DefaultTheme
local Icons = TS.import(script, script.Parent.Parent.Parent.Parent, "enums").Icons
local ToastVariants = TS.import(script, script.Parent.Parent, "enums", "ToastVariants").default
local useToastStyles = makeStyles(function(theme, _param)
	local variant = _param.variant
	if variant == nil then
		variant = ToastVariants.default
	end
	local getToastColor = function()
		repeat
			if variant == (ToastVariants.success) then
				return DefaultTheme.palette.success.main
			end
			if variant == (ToastVariants.error) then
				return DefaultTheme.palette.error.main
			end
			if variant == (ToastVariants.warning) then
				return DefaultTheme.palette.warning.main
			end
			return DefaultTheme.options.constants.colors.backgroundUIContrast
		until true
	end
	local ACTIVE_POSITION = UDim2.new(0.5, 0, 1, -DefaultTheme.padding.calc(2))
	local INACTIVE_POSITION = UDim2.new(0.5, 0, 1, DefaultTheme.spacing.calc(20) + DefaultTheme.padding.calc(2))
	return createStyles({
		container = {
			Size = UDim2.new(0, theme.spacing.calc(20), 0, theme.spacing.calc(4)),
			Position = INACTIVE_POSITION,
			BackgroundColor3 = getToastColor(),
			AnchorPoint = Vector2.new(0.5, 1),
			BorderSizePixel = 0,
			ZIndex = 50000,
		},
		label = {
			Size = UDim2.new(1, -theme.padding.calc(4), 1, -theme.padding.calc(4)),
			Position = UDim2.new(0.5, 0, 0.5, 0),
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			TextSize = theme.typography.fontSizes.body,
			TextColor3 = theme.options.constants.extendedPalette.Common.White,
			Font = theme.typography.fontFamilies.default,
			TextScaled = false,
			ZIndex = 50001,
		},
		close = {
			Size = UDim2.new(0, theme.spacing.calc(1), 0, theme.spacing.calc(1)),
			Position = UDim2.new(1, -theme.padding.calc(2), 0, theme.padding.calc(2)),
			AnchorPoint = Vector2.new(1, 0),
			ImageColor3 = theme.options.constants.colors.iconDefault,
			Image = Icons.Close,
			BackgroundTransparency = 1,
			AutoButtonColor = false,
			BorderSizePixel = 0,
			Active = true,
			ZIndex = 50001,
		},
		activePosition = {
			Position = ACTIVE_POSITION,
		},
		inActivePosition = {
			Position = INACTIVE_POSITION,
		},
	})
end)
local default = useToastStyles
return {
	default = default,
}
