-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Green = {
	[120] = Color3FromHex("#001A0E"),
	[110] = Color3FromHex("#00351D"),
	[100] = Color3FromHex("#004F2B"),
	[90] = Color3FromHex("#006939"),
	[80] = Color3FromHex("#008347"),
	[70] = Color3FromHex("#009e56"),
	[60] = Color3FromHex("#00B864"),
	[50] = Color3FromHex("#00E87E"),
	[40] = Color3FromHex("#26FF9C"),
	[30] = Color3FromHex("#5CFFB5"),
	[20] = Color3FromHex("#90FFCC"),
	[10] = Color3FromHex("#C9FFE6"),
}
local default = Green
return {
	default = default,
}
