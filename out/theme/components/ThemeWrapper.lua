-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useEffect = _roact_hooked.useEffect
local useRef = _roact_hooked.useRef
local _roact_rodux_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-rodux-hooked").src)
local useDispatch = _roact_rodux_hooked.useDispatch
local useSelector = _roact_rodux_hooked.useSelector
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local selectTheme = TS.import(script, script.Parent, "ThemeStore").selectTheme
local DefaultTheme = TS.import(script, script.Parent.Parent, "themes").default
local function ThemeWrapper(props)
	local _binding = props
	local theme = _binding.theme
	local children = _binding[Roact.Children]
	local dispatch = useDispatch()
	local ref = useRef()
	local currentTheme = useSelector(selectTheme)
	-- When theme changes
	useEffect(function()
		dispatch({
			type = "set",
			newTheme = theme or DefaultTheme,
		})
	end, { theme })
	local _attributes = {
		BackgroundTransparency = 1,
		Size = UDim2.new(1, 0, 1, 0),
		ZIndex = 500000,
		[Roact.Ref] = ref,
	}
	local _children = {}
	local _length = #_children
	local _child = currentTheme and children
	if _child then
		for _k, _v in _child do
			if type(_k) == "number" then
				_children[_length + _k] = _v
			else
				_children[_k] = _v
			end
		end
	end
	return Roact.createFragment({
		["ThemeWrapper-" .. currentTheme.type] = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(ThemeWrapper)
return {
	default = default,
}
