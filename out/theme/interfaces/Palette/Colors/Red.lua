-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Red = {
	[120] = Color3FromHex("#290403"),
	[110] = Color3FromHex("#510905"),
	[100] = Color3FromHex("#7A0D08"),
	[90] = Color3FromHex("#A2120B"),
	[80] = Color3FromHex("#CB160E"),
	[70] = Color3FromHex("#EF1E14"),
	[60] = Color3FromHex("#F2453D"),
	[50] = Color3FromHex("#F4645D"),
	[40] = Color3FromHex("#F6837E"),
	[30] = Color3FromHex("#F9A29E"),
	[20] = Color3FromHex("#FBC1BE"),
	[10] = Color3FromHex("#FDE0DF"),
}
local default = Red
return {
	default = default,
}
