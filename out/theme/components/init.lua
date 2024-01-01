-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local exports = {}
exports.ThemeProvider = TS.import(script, script, "ThemeProvider").default
for _k, _v in TS.import(script, script, "ThemeProvider") or {} do
	exports[_k] = _v
end
exports.themeReducer = TS.import(script, script, "ThemeStore").themeReducer
exports.themeStore = TS.import(script, script, "ThemeStore").themeStore
return exports
