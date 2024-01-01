-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Turquoise = {
	[120] = Color3FromHex("#001E1E"),
	[110] = Color3FromHex("#003B3B"),
	[100] = Color3FromHex("#005959"),
	[90] = Color3FromHex("#007777"),
	[80] = Color3FromHex("#009595"),
	[70] = Color3FromHex("#00B2B2"),
	[60] = Color3FromHex("#00D0D0"),
	[50] = Color3FromHex("#03FFFF"),
	[40] = Color3FromHex("#36FFFF"),
	[30] = Color3FromHex("#68FFFF"),
	[20] = Color3FromHex("#9AFFFF"),
	[10] = Color3FromHex("#CDFFFF"),
}
local default = Turquoise
return {
	default = default,
}
