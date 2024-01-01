-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useState = _roact_hooked.useState
local useButtonStyles = TS.import(script, script.Parent, "Button.styles").default
local function Button(props)
	local _binding = props
	local text = _binding.text
	if text == nil then
		text = ""
	end
	local variant = _binding.variant
	if variant == nil then
		variant = "contained"
	end
	local disabled = _binding.disabled
	if disabled == nil then
		disabled = false
	end
	local loading = _binding.loading
	if loading == nil then
		loading = false
	end
	local rounded = _binding.rounded
	if rounded == nil then
		rounded = false
	end
	local hoveringDisabled = _binding.hoveringDisabled
	if hoveringDisabled == nil then
		hoveringDisabled = false
	end
	local onLeftClick = _binding.onLeftClick
	local onLeftDown = _binding.onLeftDown
	local onLeftUp = _binding.onLeftUp
	local onRightClick = _binding.onRightClick
	local onRightDown = _binding.onRightDown
	local onRightUp = _binding.onRightUp
	local mouseEnter = _binding.mouseEnter
	local mouseLeave = _binding.mouseLeave
	local className = _binding.className
	local children = _binding[Roact.Children]
	local _binding_1 = useButtonStyles(props)
	local root = _binding_1.root
	local font = _binding_1.font
	local corner = _binding_1.corner
	local stroke = _binding_1.stroke
	local hovering, setHovering = useState(false)
	local _attributes = {}
	for _k, _v in root do
		_attributes[_k] = _v
	end
	for _k, _v in font do
		_attributes[_k] = _v
	end
	_attributes.Active = not disabled and not loading
	_attributes.Text = text
	local _result
	if (not hoveringDisabled and hovering) or (disabled or loading) then
		_result = 0.75
	else
		local _result_1 = className
		if _result_1 ~= nil then
			_result_1 = _result_1.BackgroundTransparency
		end
		local _condition = _result_1
		if _condition == nil then
			_condition = (if variant == "outlined" or variant == "text" then 1 else 0)
		end
		_result = _condition
	end
	_attributes.BackgroundTransparency = _result
	_attributes[Roact.Event.MouseEnter] = function()
		setHovering(true)
		if mouseEnter then
			mouseEnter()
		end
	end
	_attributes[Roact.Event.MouseLeave] = function()
		setHovering(false)
		if mouseLeave then
			mouseLeave()
		end
	end
	_attributes[Roact.Event.MouseButton1Click] = function()
		if not disabled and not loading then
			if onLeftClick then
				onLeftClick()
			end
		end
	end
	_attributes[Roact.Event.MouseButton1Down] = function()
		if not disabled and not loading then
			if onLeftDown then
				onLeftDown()
			end
		end
	end
	_attributes[Roact.Event.MouseButton1Up] = function()
		if not disabled and not loading then
			if onLeftUp then
				onLeftUp()
			end
		end
	end
	_attributes[Roact.Event.MouseButton2Click] = function()
		if not disabled and not loading then
			if onRightClick then
				onRightClick()
			end
		end
	end
	_attributes[Roact.Event.MouseButton2Down] = function()
		if not disabled and not loading then
			if onRightDown then
				onRightDown()
			end
		end
	end
	_attributes[Roact.Event.MouseButton2Up] = function()
		if not disabled and not loading then
			if onRightUp then
				onRightUp()
			end
		end
	end
	if className then
		for _k, _v in className do
			_attributes[_k] = _v
		end
	end
	local _condition = variant == "outlined"
	if _condition then
		local _attributes_1 = {}
		for _k, _v in stroke do
			_attributes_1[_k] = _v
		end
		_condition = Roact.createElement("UIStroke", _attributes_1)
	end
	local _children = {}
	local _length = #_children
	if _condition then
		_children[_length + 1] = _condition
	end
	_length = #_children
	local _condition_1 = rounded
	if _condition_1 then
		local _attributes_1 = {}
		for _k, _v in corner do
			_attributes_1[_k] = _v
		end
		_condition_1 = Roact.createElement("UICorner", _attributes_1)
	end
	if _condition_1 then
		_children[_length + 1] = _condition_1
	end
	_length = #_children
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
		Button = Roact.createElement("TextButton", _attributes, _children),
	})
end
local default = markPureComponent(Button)
return {
	default = default,
}
