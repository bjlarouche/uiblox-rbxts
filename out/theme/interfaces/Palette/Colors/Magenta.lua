-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Magenta = {
	[120] = Color3FromHex("#240620"),
	[110] = Color3FromHex("#490B41"),
	[100] = Color3FromHex("#6D1161"),
	[90] = Color3FromHex("#921781"),
	[80] = Color3FromHex("#B61CA2"),
	[70] = Color3FromHex("#DB22C2"),
	[60] = Color3FromHex("#E245CD"),
	[50] = Color3FromHex("#E764D5"),
	[40] = Color3FromHex("#EC83DE"),
	[30] = Color3FromHex("#F1A2E6"),
	[20] = Color3FromHex("#F5C1EE"),
	[10] = Color3FromHex("#FAE0F7"),
}
local default = Magenta
return {
	default = default,
}
