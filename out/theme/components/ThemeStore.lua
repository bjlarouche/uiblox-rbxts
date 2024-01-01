-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _rodux = TS.import(script, TS.getModule(script, "@rbxts", "rodux").src)
local createReducer = _rodux.createReducer
local Store = _rodux.Store
local createSelector = TS.import(script, TS.getModule(script, "@rbxts", "roselect").src).createSelector
local DefaultTheme = TS.import(script, script.Parent.Parent, "themes").default
local themeReducer = createReducer({
	theme = DefaultTheme,
}, {
	set = function(_param, _param_1)
		local theme = _param.theme
		local newTheme = _param_1.newTheme
		return {
			theme = newTheme or theme,
		}
	end,
})
local themeStore = Store.new(themeReducer)
local selectTheme = createSelector(function(state)
	return state.theme
end, function(theme)
	return theme
end)
return {
	themeReducer = themeReducer,
	themeStore = themeStore,
	selectTheme = selectTheme,
}
