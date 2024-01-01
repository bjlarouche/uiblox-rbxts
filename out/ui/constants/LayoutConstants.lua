-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local DefaultTheme = TS.import(script, script.Parent.Parent.Parent, "theme").DefaultTheme
local ROBLOX_UI_OFFSET = DefaultTheme.spacing.calc(2) + DefaultTheme.padding.calc(4)
return {
	ROBLOX_UI_OFFSET = ROBLOX_UI_OFFSET,
}
