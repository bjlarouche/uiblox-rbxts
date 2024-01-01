-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Gray = TS.import(script, script.Parent, "Gray").default
-- Designer defines this with gray value but still mark different color name,
-- so that mapping it because in the design spec, they will use this, so make
-- Engineers be able to identify
local Dark = {
	[120] = Gray[10],
	[110] = Gray[20],
	[100] = Gray[30],
	[90] = Gray[40],
	[80] = Gray[50],
	[70] = Gray[60],
	[60] = Gray[70],
	[50] = Gray[80],
	[40] = Gray[90],
	[30] = Gray[100],
	[20] = Gray[110],
	[10] = Gray[120],
}
local default = Dark
return {
	default = default,
}
