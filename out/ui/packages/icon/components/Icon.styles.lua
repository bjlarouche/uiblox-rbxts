-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useIconStyles = makeStyles(function(theme, props)
	local getIconSize = function(props)
		local _binding = props
		local size = _binding.size
		repeat
			if size == "xxs" then
				return UDim2.new(0, theme.spacing.calc(0.5), 0, theme.spacing.calc(0.5))
			end
			if size == "xs" then
				return UDim2.new(0, theme.spacing.calc(1), 0, theme.spacing.calc(1))
			end
			if size == "sm" then
				return UDim2.new(0, theme.spacing.calc(2), 0, theme.spacing.calc(2))
			end
			if size == "md" then
				return UDim2.new(0, theme.spacing.calc(3), 0, theme.spacing.calc(3))
			end
			if size == "lg" then
				return UDim2.new(0, theme.spacing.calc(6), 0, theme.spacing.calc(6))
			end
			if size == "xl" then
				return UDim2.new(0, theme.spacing.calc(8), 0, theme.spacing.calc(8))
			end
			return UDim2.new(0, theme.spacing.calc(2), 0, theme.spacing.calc(2))
		until true
	end
	return createStyles({
		container = {
			Size = getIconSize(props),
			BackgroundColor3 = theme.palette.secondary.main,
			ImageColor3 = theme.palette.text.primary,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ScaleType = Enum.ScaleType.Fit,
			ZIndex = 12000,
		},
	})
end)
local default = useIconStyles
return {
	default = default,
}
