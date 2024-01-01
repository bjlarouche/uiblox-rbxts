-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local ROBLOX_UI_OFFSET = TS.import(script, script.Parent.Parent.Parent.Parent, "constants").ROBLOX_UI_OFFSET
local useSidebarStyles = makeStyles(function(theme, props)
	local _binding = props
	local size = _binding.size
	local ignoreInset = _binding.ignoreInset
	if ignoreInset == nil then
		ignoreInset = false
	end
	local sidebarWidths = {
		large = theme.spacing.calc(15),
		compact = theme.spacing.calc(5),
	}
	return createStyles({
		root = {
			Size = UDim2.new(0, if size == "compact" then sidebarWidths.compact else sidebarWidths.large, 1, 0),
			BackgroundColor3 = theme.options.constants.colors.backgroundUIMuted,
			BorderSizePixel = 0,
			ZIndex = 5000,
		},
		container = {
			Size = UDim2.new(1, -theme.padding.calc(4), 1, -(theme.padding.calc(4) + (if ignoreInset then 0 else ROBLOX_UI_OFFSET))),
			Position = UDim2.new(0.5, 0, 0, theme.padding.calc(2) + (if ignoreInset then 0 else ROBLOX_UI_OFFSET)),
			AnchorPoint = Vector2.new(0.5, 0),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5100,
		},
	})
end)
local default = useSidebarStyles
return {
	default = default,
}
