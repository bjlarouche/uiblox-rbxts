-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
for _k, _v in TS.import(script, script, "FontSizes") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script, "FontFamilies") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script, "Variants") or {} do
	exports[_k] = _v
end
return exports
