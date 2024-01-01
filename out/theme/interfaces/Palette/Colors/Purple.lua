-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Color3FromHex = TS.import(script, script.Parent.Parent.Parent.Parent, "utilites").Color3FromHex
local Purple = {
	[120] = Color3FromHex("#0F0523"),
	[110] = Color3FromHex("#1D0A46"),
	[100] = Color3FromHex("#2C0E69"),
	[90] = Color3FromHex("#3B138C"),
	[80] = Color3FromHex("#4918AF"),
	[70] = Color3FromHex("#581DD2"),
	[60] = Color3FromHex("#6D34E3"),
	[50] = Color3FromHex("#8556E8"),
	[40] = Color3FromHex("#9E78EC"),
	[30] = Color3FromHex("#B69AF1"),
	[20] = Color3FromHex("#CEBBF6"),
	[10] = Color3FromHex("#E7DDFA"),
}
local default = Purple
return {
	default = default,
}
