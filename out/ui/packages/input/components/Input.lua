-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local useState = _roact_hooked.useState
local markPureComponent = _roact_hooked.markPureComponent
local classNames = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme").classNames
local Divider = TS.import(script, script.Parent.Parent.Parent, "divider").Divider
local Orientations = TS.import(script, script.Parent.Parent.Parent.Parent, "enums").Orientations
local useInputStyles = TS.import(script, script.Parent, "Input.styles").default
local function Input(props)
	local _binding = props
	local text = _binding.text
	local placeholder = _binding.placeholder
	local helperText = _binding.helperText
	local variant = _binding.variant
	if variant == nil then
		variant = "standard"
	end
	local disabled = _binding.disabled
	if disabled == nil then
		disabled = false
	end
	local hasError = _binding.hasError
	if hasError == nil then
		hasError = false
	end
	local rounded = _binding.rounded
	if rounded == nil then
		rounded = false
	end
	local onTextChanged = _binding.onTextChanged
	local onFocus = _binding.onFocus
	local onBlur = _binding.onBlur
	local onEnterPressed = _binding.onEnterPressed
	local className = _binding.className
	local _binding_1 = useInputStyles(props)
	local root = _binding_1.root
	local font = _binding_1.font
	local margin = _binding_1.margin
	local box = _binding_1.box
	local helper = _binding_1.helper
	local errorColorFrame = _binding_1.errorColorFrame
	local errorColorText = _binding_1.errorColorText
	local divider = _binding_1.divider
	local corner = _binding_1.corner
	local stroke = _binding_1.stroke
	local _condition = text
	if _condition == nil then
		_condition = ""
	end
	local input, setInput = useState(_condition)
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
	for _k, _v in margin do
		_attributes_1[_k] = _v
	end
	local _children_1 = {}
	local _length_1 = #_children_1
	local _attributes_2 = {}
	for _k, _v in font do
		_attributes_2[_k] = _v
	end
	for _k, _v in box do
		_attributes_2[_k] = _v
	end
	_attributes_2.Active = not disabled
	_attributes_2.Text = input
	_attributes_2.PlaceholderText = placeholder
	for _k, _v in classNames({
		[errorColorText] = hasError,
	}) do
		_attributes_2[_k] = _v
	end
	_attributes_2[Roact.Event.ReturnPressedFromOnScreenKeyboard] = function(rbx)
		if onEnterPressed then
			local text = rbx.Text
			onEnterPressed(text)
		end
	end
	_attributes_2[Roact.Event.Focused] = onFocus
	_attributes_2[Roact.Event.FocusLost] = function(rbx)
		if onTextChanged then
			local text = rbx.Text
			onTextChanged(text)
		end
		if onBlur then
			onBlur()
		end
	end
	local _condition_1 = variant == "outlined"
	if _condition_1 then
		local _attributes_3 = {}
		for _k, _v in stroke do
			_attributes_3[_k] = _v
		end
		_condition_1 = Roact.createElement("UIStroke", _attributes_3)
	end
	local _children_2 = {}
	local _length_2 = #_children_2
	if _condition_1 then
		_children_2[_length_2 + 1] = _condition_1
	end
	_length_2 = #_children_2
	local _condition_2 = rounded
	if _condition_2 then
		local _attributes_3 = {}
		for _k, _v in corner do
			_attributes_3[_k] = _v
		end
		_condition_2 = Roact.createElement("UICorner", _attributes_3)
	end
	if _condition_2 then
		_children_2[_length_2 + 1] = _condition_2
	end
	_children_1.Field = Roact.createElement("TextBox", _attributes_2, _children_2)
	_children_1[_length_1 + 1] = Roact.createElement(Divider, {
		padding = 0,
		orientation = Orientations.Horizontal,
		className = classNames({
			[errorColorFrame] = hasError,
			[divider] = true,
		}),
	})
	local _condition_3 = helperText ~= nil
	if _condition_3 then
		local _attributes_3 = {}
		for _k, _v in font do
			_attributes_3[_k] = _v
		end
		for _k, _v in helper do
			_attributes_3[_k] = _v
		end
		for _k, _v in classNames({
			[errorColorText] = hasError,
		}) do
			_attributes_3[_k] = _v
		end
		_attributes_3.Text = helperText
		_condition_3 = (Roact.createFragment({
			HelperText = Roact.createElement("TextLabel", _attributes_3),
		}))
	end
	if _condition_3 then
		_children_1[_length_1 + 2] = _condition_3
	end
	_children.Margin = Roact.createElement("Frame", _attributes_1, _children_1)
	return Roact.createFragment({
		Input = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(Input)
return {
	default = default,
}
