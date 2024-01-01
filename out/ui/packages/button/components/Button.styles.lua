-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local makeRootStyles = function(theme, _param)
	local size = _param.size
	local color = _param.color
	local fullWidth = _param.fullWidth
	local variant = _param.variant
	--[[
		*
			 * Default style override
			 
	]]
	local defaultStyles = {}
	repeat
		if size == "small" then
			defaultStyles.Size = UDim2.new(0, theme.spacing.calc(8), 0, theme.spacing.calc(2))
			break
		end
		if size == "medium" then
			defaultStyles.Size = UDim2.new(0, theme.spacing.calc(12), 0, theme.spacing.calc(3))
			break
		end
		if size == "large" then
			defaultStyles.Size = UDim2.new(0, theme.spacing.calc(16), 0, theme.spacing.calc(4))
			break
		end
		defaultStyles.Size = UDim2.new(0, theme.spacing.calc(8), 0, theme.spacing.calc(2))
		break
	until true
	if fullWidth then
		-- Make full width minus padding
		local _exp = -theme.padding.calc(4)
		local _result = defaultStyles.Size
		if _result ~= nil then
			_result = _result.Y.Scale
		end
		local _condition = _result
		if _condition == nil then
			_condition = 0
		end
		local _result_1 = defaultStyles.Size
		if _result_1 ~= nil then
			_result_1 = _result_1.Y.Offset
		end
		local _condition_1 = _result_1
		if _condition_1 == nil then
			_condition_1 = 0
		end
		defaultStyles.Size = UDim2.new(1, _exp, _condition, _condition_1)
		-- And center it horizontally
		defaultStyles.AnchorPoint = Vector2.new(0.5, 0)
		local _result_2 = defaultStyles.Position
		if _result_2 ~= nil then
			_result_2 = _result_2.X.Offset
		end
		local _condition_2 = _result_2
		if _condition_2 == nil then
			_condition_2 = 0
		end
		local _result_3 = defaultStyles.Position
		if _result_3 ~= nil then
			_result_3 = _result_3.Y.Scale
		end
		local _condition_3 = _result_3
		if _condition_3 == nil then
			_condition_3 = 0
		end
		local _result_4 = defaultStyles.Position
		if _result_4 ~= nil then
			_result_4 = _result_4.Y.Offset
		end
		local _condition_4 = _result_4
		if _condition_4 == nil then
			_condition_4 = 0
		end
		defaultStyles.Position = UDim2.new(0.5, _condition_2, _condition_3, _condition_4)
	end
	defaultStyles.BackgroundColor3 = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary
	defaultStyles.TextColor3 = theme.palette.background.default
	repeat
		if variant == "contained" then
			defaultStyles.BackgroundTransparency = 0
			defaultStyles.BorderSizePixel = 0
			break
		end
		if variant == "outlined" then
			defaultStyles.TextColor3 = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary
			defaultStyles.BackgroundTransparency = 1
			defaultStyles.BorderSizePixel = theme.options.constants.borders.default
			break
		end
		if variant == "text" then
			defaultStyles.TextColor3 = if color == "primary" then theme.palette.secondary.main else theme.palette.text.primary
			defaultStyles.BackgroundTransparency = 1
			defaultStyles.BorderSizePixel = 0
			break
		end
		defaultStyles.BackgroundTransparency = 0
		defaultStyles.BorderSizePixel = 0
		break
	until true
	defaultStyles.ZIndex = 10000
	return defaultStyles
end
local useButtonStyles = makeStyles(function(theme, _param)
	local size = _param.size
	if size == nil then
		size = "small"
	end
	local color = _param.color
	if color == nil then
		color = "primary"
	end
	local fullWidth = _param.fullWidth
	if fullWidth == nil then
		fullWidth = false
	end
	local variant = _param.variant
	if variant == nil then
		variant = "contained"
	end
	return createStyles({
		root = makeRootStyles(theme, {
			size = size,
			color = color,
			fullWidth = fullWidth,
			variant = variant,
		}),
		font = {
			TextSize = theme.typography.fontSizes.button,
			Font = theme.typography.fontFamilies.default,
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
local default = useButtonStyles
return {
	default = default,
}
