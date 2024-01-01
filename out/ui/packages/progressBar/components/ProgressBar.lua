-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local markPureComponent = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src).markPureComponent
local useProgressBarStyles = TS.import(script, script.Parent, "ProgressBar.styles").default
local function ProgressBar(_param)
	local progress = _param.progress
	local className = _param.className
	local _binding = useProgressBarStyles()
	local container = _binding.container
	local outer = _binding.outer
	local stroke = _binding.stroke
	local inner = _binding.inner
	local fill = _binding.fill
	local corner = _binding.corner
	local _attributes = {}
	for _k, _v in container do
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
	for _k, _v in outer do
		_attributes_1[_k] = _v
	end
	local _children_1 = {}
	local _length_1 = #_children_1
	local _attributes_2 = {}
	for _k, _v in corner do
		_attributes_2[_k] = _v
	end
	_children_1.Corner = Roact.createElement("UICorner", _attributes_2)
	local _attributes_3 = {}
	for _k, _v in stroke do
		_attributes_3[_k] = _v
	end
	_children_1[_length_1 + 1] = Roact.createElement("UIStroke", _attributes_3)
	local _attributes_4 = {}
	for _k, _v in inner do
		_attributes_4[_k] = _v
	end
	local _children_2 = {}
	local _length_2 = #_children_2
	local _attributes_5 = {}
	for _k, _v in corner do
		_attributes_5[_k] = _v
	end
	_children_2.Corner = Roact.createElement("UICorner", _attributes_5)
	local _attributes_6 = {}
	for _k, _v in fill do
		_attributes_6[_k] = _v
	end
	_attributes_6.Size = UDim2.new(progress / 100, 0, 1, 0)
	local _children_3 = {}
	local _length_3 = #_children_3
	local _attributes_7 = {}
	for _k, _v in corner do
		_attributes_7[_k] = _v
	end
	_children_3.Corner = Roact.createElement("UICorner", _attributes_7)
	_children_2[_length_2 + 1] = Roact.createElement("Frame", _attributes_6, _children_3)
	_children_1[_length_1 + 2] = Roact.createElement("Frame", _attributes_4, _children_2)
	_children.Bar = Roact.createElement("Frame", _attributes_1, _children_1)
	return Roact.createFragment({
		ProgressBar = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(ProgressBar)
return {
	default = default,
}
