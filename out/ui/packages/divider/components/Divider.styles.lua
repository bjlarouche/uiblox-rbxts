-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local Orientations = TS.import(script, script.Parent.Parent.Parent.Parent, "enums").Orientations
local useDividerStyles = makeStyles(function(theme, props)
	local _binding = props
	local position = _binding.position
	local orientation = _binding.orientation
	if orientation == nil then
		orientation = Orientations.Horizontal
	end
	local padding = _binding.padding
	if padding == nil then
		padding = theme.padding.calc(2)
	end
	local color = _binding.color
	if color == nil then
		color = theme.options.constants.colors.divider
	end
	local transparency = _binding.transparency
	if transparency == nil then
		transparency = 0
	end
	local weight = _binding.weight
	if weight == nil then
		weight = theme.options.constants.borders.default
	end
	return createStyles({
		root = {
			Position = position or UDim2.new(0, 0, 0, 0),
			Size = UDim2.new(if orientation == Orientations.Horizontal then 1 else 0, if orientation == Orientations.Horizontal then -padding * 2 else weight, if orientation == Orientations.Vertical then 1 else 0, if orientation == Orientations.Vertical then -padding * 2 else weight),
			BackgroundColor3 = color or Color3.fromRGB(255, 255, 255),
			BackgroundTransparency = transparency,
		},
	})
end)
local default = useDividerStyles
return {
	default = default,
}
