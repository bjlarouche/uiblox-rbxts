-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local markPureComponent = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src).markPureComponent
local useIconStyles = TS.import(script, script.Parent, "Icon.styles").default
local function Icon(props)
	local _binding = props
	local icon = _binding.icon
	local tint = _binding.tint
	local className = _binding.className
	local _binding_1 = useIconStyles(props)
	local container = _binding_1.container
	local _attributes = {}
	for _k, _v in container do
		_attributes[_k] = _v
	end
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	_attributes.Image = tostring(icon)
	_attributes.ImageColor3 = tint or container.ImageColor3
	return Roact.createFragment({
		Icon = Roact.createElement("ImageLabel", _attributes),
	})
end
local default = markPureComponent(Icon)
return {
	default = default,
}
