-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
exports.TreeView = TS.import(script, script, "components", "TreeView").default
for _k, _v in TS.import(script, script, "components", "TreeView") or {} do
	exports[_k] = _v
end
return exports
