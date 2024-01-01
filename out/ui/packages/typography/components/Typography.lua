-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local useTypographyStyles = TS.import(script, script.Parent, "Typography.styles").default
local function Typography(props)
	local _binding = props
	local text = _binding.text
	if text == nil then
		text = ""
	end
	local className = _binding.className
	local children = _binding[Roact.Children]
	local _binding_1 = useTypographyStyles(props)
	local root = _binding_1.root
	local variantToken = _binding_1.variantToken
	local _attributes = {}
	for _k, _v in root do
		_attributes[_k] = _v
	end
	_attributes.Text = text
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	for _k, _v in variantToken do
		_attributes[_k] = _v
	end
	local _children = {}
	local _length = #_children
	if children then
		for _k, _v in children do
			if type(_k) == "number" then
				_children[_length + _k] = _v
			else
				_children[_k] = _v
			end
		end
	end
	return Roact.createFragment({
		Typography = Roact.createElement("TextLabel", _attributes, _children),
	})
end
local default = Typography
return {
	default = default,
}
