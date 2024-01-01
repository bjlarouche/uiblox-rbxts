-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useEffect = _roact_hooked.useEffect
local useState = _roact_hooked.useState
local useShadowStyles = TS.import(script, script.Parent, "Shadow.styles").default
local function Shadow()
	local _binding = useShadowStyles()
	local container = _binding.container
	local parent, setParent = useState(nil)
	local cornerRadius, setCornerRadius = useState()
	local _condition = container.ZIndex
	if _condition == nil then
		_condition = 0
	end
	local defaultZIndex = _condition
	local zIndex, setZIndex = useState(defaultZIndex)
	-- Set any inherited properties
	useEffect(function()
		if not parent then
			return nil
		end
		local _cornerRadius = parent
		if _cornerRadius ~= nil then
			_cornerRadius = _cornerRadius:FindFirstChildOfClass("UICorner")
			if _cornerRadius ~= nil then
				_cornerRadius = _cornerRadius.CornerRadius
			end
		end
		local cornerRadius = _cornerRadius
		setCornerRadius(cornerRadius)
		local _result = parent
		if _result ~= nil then
			_result = _result.ZIndex
		end
		local _condition_1 = _result
		if _condition_1 == nil then
			_condition_1 = defaultZIndex
		end
		setZIndex(_condition_1 - 1)
		parent.ClipsDescendants = false
	end, { parent })
	local _attributes = {}
	for _k, _v in container do
		_attributes[_k] = _v
	end
	_attributes.ZIndex = zIndex
	_attributes[Roact.Event.AncestryChanged] = function(rbx, parent)
		if parent:IsA("GuiObject") and rbx.Parent == parent then
			setParent(parent)
		end
	end
	local _children = {}
	local _length = #_children
	local _child = cornerRadius ~= nil and Roact.createFragment({
		Corner = Roact.createElement("UICorner", {
			CornerRadius = cornerRadius,
		}),
	})
	if _child then
		_children[_length + 1] = _child
	end
	return Roact.createFragment({
		Shadow = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(Shadow)
return {
	default = default,
}
