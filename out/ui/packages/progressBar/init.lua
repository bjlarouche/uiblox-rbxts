-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
exports.ProgressBar = TS.import(script, script, "components", "ProgressBar").default
for _k, _v in TS.import(script, script, "components", "ProgressBar") or {} do
	exports[_k] = _v
end
return exports
