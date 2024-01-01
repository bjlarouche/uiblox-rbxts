-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Gray = {
	[120] = Color3FromHex("#171717"),
	[110] = Color3FromHex("#1D1D1D"),
	[100] = Color3FromHex("#222222"),
	[90] = Color3FromHex("#2C2C2C"),
	[80] = Color3FromHex("#3B3B3B"),
	[70] = Color3FromHex("#565656"),
	[60] = Color3FromHex("#989898"),
	[50] = Color3FromHex("#CBCBCB"),
	[40] = Color3FromHex("#E1E1E1"),
	[30] = Color3FromHex("#EDEDED"),
	[20] = Color3FromHex("#F6F6F6"),
	[10] = Color3FromHex("#FAFAFA"),
}
local default = Gray
return {
	default = default,
}
