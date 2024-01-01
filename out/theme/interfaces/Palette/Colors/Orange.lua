-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Orange = {
	[120] = Color3FromHex("#271003"),
	[110] = Color3FromHex("#4E2006"),
	[100] = Color3FromHex("#743109"),
	[90] = Color3FromHex("#9B410C"),
	[80] = Color3FromHex("#C2510F"),
	[70] = Color3FromHex("#E96113"),
	[60] = Color3FromHex("#EF7A36"),
	[50] = Color3FromHex("#F29057"),
	[40] = Color3FromHex("#F4A679"),
	[30] = Color3FromHex("#F7BD9A"),
	[20] = Color3FromHex("#FAD3BC"),
	[10] = Color3FromHex("#FCE9DE"),
}
local default = Orange
return {
	default = default,
}
