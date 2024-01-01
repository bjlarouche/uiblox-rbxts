-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useShadowStyles = makeStyles(function(theme)
	return createStyles({
		container = {
			Size = UDim2.new(1, theme.spacing.calc(0.25), 1, theme.spacing.calc(0.25)),
			BackgroundColor3 = theme.options.constants.colors.backgroundUIContrast,
			BackgroundTransparency = 0.8,
			BorderSizePixel = 0,
			ZIndex = -100,
		},
	})
end)
local default = useShadowStyles
return {
	default = default,
}
