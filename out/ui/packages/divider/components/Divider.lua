-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local useDividerStyles = TS.import(script, script.Parent, "Divider.styles").default
local function Divider(props)
	local _binding = props
	local className = _binding.className
	local _binding_1 = useDividerStyles(props)
	local root = _binding_1.root
	local _attributes = {}
	for _k, _v in root do
		_attributes[_k] = _v
	end
	_attributes.BorderSizePixel = 0
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	return Roact.createFragment({
		Divider = Roact.createElement("Frame", _attributes),
	})
end
local default = Divider
return {
	default = default,
}
