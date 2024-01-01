-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local allFontSizes = TS.import(script, script.Parent.Parent, "interfaces", "typography", "FontSizes").allFontSizes
local _Colors = TS.import(script, script.Parent.Parent, "interfaces", "Palette", "Colors")
local Blue = _Colors.Blue
local Gray = _Colors.Gray
local Dark = _Colors.Dark
local Light = _Colors.Light
local Common = _Colors.Common
local Red = _Colors.Red
local Green = _Colors.Green
local Yellow = _Colors.Yellow
local Purple = _Colors.Purple
local Magenta = _Colors.Magenta
local Orange = _Colors.Orange
local Turquoise = _Colors.Turquoise
local _constants = TS.import(script, script.Parent.Parent, "constants")
local BORDER_RADIUS = _constants.BORDER_RADIUS
local PADDING_BASE = _constants.PADDING_BASE
local SPACING_BASE = _constants.SPACING_BASE
local CONTENT_WIDTH = _constants.CONTENT_WIDTH
local ICON_SIZES = _constants.ICON_SIZES
local DEFAULT_BORDERS = _constants.DEFAULT_BORDERS
local LIGHT_THEME_COLORS = _constants.LIGHT_THEME_COLORS
local allFontFamilies = TS.import(script, script.Parent.Parent, "interfaces", "typography", "FontFamilies").allFontFamilies
local LightTheme = {
	type = "Light",
	palette = {
		error = {
			main = Red[50],
		},
		primary = {
			main = Green[50],
		},
		secondary = {
			main = Blue[50],
		},
		success = {
			main = Green[50],
		},
		text = {
			primary = Common.Black,
			secondary = Dark[90],
		},
		divider = Gray[70],
		background = {
			default = Common.White,
			paper = Gray[10],
		},
		warning = {
			main = Yellow[50],
		},
	},
	spacing = {
		default = SPACING_BASE,
		calc = function(value)
			return SPACING_BASE * value
		end,
	},
	padding = {
		default = PADDING_BASE,
		calc = function(value)
			return PADDING_BASE * value
		end,
	},
	shape = {
		borderRadius = BORDER_RADIUS,
	},
	typography = {
		fontSizes = allFontSizes,
		fontFamilies = allFontFamilies,
	},
	options = {
		constants = {
			contentWidth = CONTENT_WIDTH,
			iconSizes = ICON_SIZES,
			colors = LIGHT_THEME_COLORS,
			borders = DEFAULT_BORDERS,
			extendedPalette = {
				Blue = Blue,
				Common = Common,
				Dark = Dark,
				Gray = Gray,
				Green = Green,
				Light = Light,
				Magenta = Magenta,
				Orange = Orange,
				Purple = Purple,
				Red = Red,
				Turquoise = Turquoise,
				Yellow = Yellow,
			},
		},
	},
}
local default = LightTheme
return {
	default = default,
}
