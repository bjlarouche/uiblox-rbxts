-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local markPureComponent = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src).markPureComponent
local StoreProvider = TS.import(script, TS.getModule(script, "@rbxts", "roact-rodux-hooked").src).StoreProvider
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local themeStore = TS.import(script, script.Parent, "ThemeStore").themeStore
local ThemeWrapper = TS.import(script, script.Parent, "ThemeWrapper").default
local function ThemeProvider(props)
	local _binding = props
	local theme = _binding.theme
	local children = _binding[Roact.Children]
	local _attributes = {
		store = themeStore,
	}
	local _children = {}
	local _length = #_children
	local _attributes_1 = {
		theme = theme,
	}
	local _children_1 = {}
	local _length_1 = #_children_1
	if children then
		for _k, _v in children do
			if type(_k) == "number" then
				_children_1[_length_1 + _k] = _v
			else
				_children_1[_k] = _v
			end
		end
	end
	_children[_length + 1] = Roact.createElement(ThemeWrapper, _attributes_1, _children_1)
	return Roact.createElement(StoreProvider, _attributes, _children)
end
local default = markPureComponent(ThemeProvider)
return {
	default = default,
}
