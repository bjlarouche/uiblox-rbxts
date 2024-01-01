-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useState = _roact_hooked.useState
local useIconButtonStyles = TS.import(script, script.Parent, "IconButton.styles").default
local function IconButton(props)
	local _binding = props
	local icon = _binding.icon
	local selected = _binding.selected
	local tint = _binding.tint
	local onClick = _binding.onClick
	local className = _binding.className
	local _binding_1 = useIconButtonStyles(props)
	local container = _binding_1.container
	local hovering, setHovering = useState(false)
	local _attributes = {}
	for _k, _v in container do
		_attributes[_k] = _v
	end
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	_attributes.BackgroundTransparency = if hovering or selected then 0.5 else 1
	_attributes.Image = tostring(icon)
	_attributes.ImageColor3 = tint or container.ImageColor3
	_attributes[Roact.Event.MouseButton1Click] = function()
		if onClick then
			onClick()
		end
	end
	_attributes[Roact.Event.MouseEnter] = function()
		setHovering(true)
	end
	_attributes[Roact.Event.MouseLeave] = function()
		setHovering(false)
	end
	return Roact.createFragment({
		IconButton = Roact.createElement("ImageButton", _attributes),
	})
end
local default = markPureComponent(IconButton)
return {
	default = default,
}
