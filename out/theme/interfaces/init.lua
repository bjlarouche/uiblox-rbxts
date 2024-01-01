-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
for _k, _v in TS.import(script, script, "Palette") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "styles") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script.Parent, "themes") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script, "typography") or {} do
	exports[_k] = _v
end
return exports
