-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
for _k, _v in TS.import(script, script, "theme") or {} do
	exports[_k] = _v
end
for _k, _v in TS.import(script, script, "ui") or {} do
	exports[_k] = _v
end
return exports
