-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Yellow = {
	[120] = Color3FromHex("#2B2002"),
	[110] = Color3FromHex("#564004"),
	[100] = Color3FromHex("#816006"),
	[90] = Color3FromHex("#AD8007"),
	[80] = Color3FromHex("#D8A009"),
	[70] = Color3FromHex("#F5BA19"),
	[60] = Color3FromHex("#F7C744"),
	[50] = Color3FromHex("#f8d063"),
	[40] = Color3FromHex("#FADA82"),
	[30] = Color3FromHex("#FBE3A2"),
	[20] = Color3FromHex("#FCECC1"),
	[10] = Color3FromHex("#FEF6E0"),
}
local default = Yellow
return {
	default = default,
}
