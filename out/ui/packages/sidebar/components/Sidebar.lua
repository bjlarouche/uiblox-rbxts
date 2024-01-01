-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local useSidebarStyles = TS.import(script, script.Parent, "Sidebar.styles").default
local function Sidebar(props)
	local _binding = props
	local className = _binding.className
	local children = _binding[Roact.Children]
	local _binding_1 = useSidebarStyles(props)
	local root = _binding_1.root
	local container = _binding_1.container
	local _attributes = {}
	for _k, _v in root do
		_attributes[_k] = _v
	end
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	local _children = {}
	local _length = #_children
	local _attributes_1 = {}
	for _k, _v in container do
		_attributes_1[_k] = _v
	end
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
	_children.Container = Roact.createElement("Frame", _attributes_1, _children_1)
	return Roact.createFragment({
		Sidebar = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = Sidebar
return {
	default = default,
}
