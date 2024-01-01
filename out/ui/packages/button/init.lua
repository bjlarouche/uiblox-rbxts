-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
exports.Button = TS.import(script, script, "components", "Button").default
for _k, _v in TS.import(script, script, "components", "Button") or {} do
	exports[_k] = _v
end
return exports
