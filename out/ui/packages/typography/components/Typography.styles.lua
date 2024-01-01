-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useTypographyStyles = makeStyles(function(theme, _param)
	local color = _param.color
	if color == nil then
		color = "initial"
	end
	local variant = _param.variant
	if variant == nil then
		variant = "body"
	end
	local family = _param.family
	if family == nil then
		family = "default"
	end
	local align = _param.align
	if align == nil then
		align = "left"
	end
	local noWrap = _param.noWrap
	if noWrap == nil then
		noWrap = false
	end
	local lineClamp = _param.lineClamp
	if lineClamp == nil then
		lineClamp = false
	end
	local DEFAULT_COLOR = theme.palette.text.primary
	-- Map of room size to stud dimensions
	local COLOR_TO_PALLETTE_MAP = {
		initial = DEFAULT_COLOR,
		primary = theme.palette.primary.main,
		secondary = theme.palette.secondary.main,
		textPrimary = theme.palette.text.primary,
		textSecondary = theme.palette.text.secondary,
		error = theme.palette.error.main,
		warning = theme.palette.warning.main,
	}
	local COLOR_TO_PALETTE = function(color, parent)
		if color == "inherit" and parent then
			if parent:IsA("TextLabel") or parent:IsA("TextButton") then
				return parent.TextColor3
			end
			return DEFAULT_COLOR
		end
		local _color = color
		local lookup = COLOR_TO_PALLETTE_MAP[_color]
		return lookup or DEFAULT_COLOR
	end
	local makeRootStyles = function()
		local defaultStyles = {}
		if color == "warning" then
			defaultStyles.TextColor3 = theme.options.constants.colors.caution
		elseif color then
			defaultStyles.TextColor3 = COLOR_TO_PALETTE(color)
		end
		repeat
			if align == "left" then
				defaultStyles.TextXAlignment = Enum.TextXAlignment.Left
				break
			end
			if align == "center" then
				defaultStyles.TextXAlignment = Enum.TextXAlignment.Center
				break
			end
			if align == "right" then
				defaultStyles.TextXAlignment = Enum.TextXAlignment.Right
				break
			end
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left
			break
		until true
		defaultStyles.TextColor3 = color and COLOR_TO_PALETTE(color)
		-- eslint-disable-next-line roblox-ts/lua-truthiness
		defaultStyles.TextWrapped = not noWrap
		defaultStyles.ClipsDescendants = lineClamp
		defaultStyles.BackgroundTransparency = 1
		defaultStyles.BorderSizePixel = 0
		defaultStyles.Size = UDim2.new(1, 0, 1, 0)
		defaultStyles.ZIndex = 10000
		return defaultStyles
	end
	return createStyles({
		root = makeRootStyles(),
		variantToken = {
			TextSize = variant and theme.typography.fontSizes[variant],
			Font = family and theme.typography.fontFamilies[family],
		},
	})
end)
local default = useTypographyStyles
return {
	default = default,
}
