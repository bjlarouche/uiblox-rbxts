-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local BoatTween = TS.import(script, TS.getModule(script, "@rbxts", "boat-tween").src).BoatTween
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useEffect = _roact_hooked.useEffect
local useRef = _roact_hooked.useRef
local DefaultTheme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme").DefaultTheme
local Directions = TS.import(script, script.Parent.Parent.Parent.Parent, "enums").Directions
local Shadow = TS.import(script, script.Parent.Parent.Parent, "shadow").Shadow
local useToastStyles = TS.import(script, script.Parent, "Toast.styles").default
local TWEEN_DURATION = 0.5
local function Toast(props)
	local _binding = props
	local text = _binding.text
	local onDismiss = _binding.onDismiss
	local duration = _binding.duration
	if duration == nil then
		duration = 4
	end
	local _binding_1 = useToastStyles(props)
	local container = _binding_1.container
	local label = _binding_1.label
	local close = _binding_1.close
	local activePosition = _binding_1.activePosition
	local inActivePosition = _binding_1.inActivePosition
	local frameRef = useRef()
	local tween = function(direction)
		local frame = frameRef:getValue()
		if not frame then
			return nil
		end
		local tween = BoatTween:Create(frame, {
			Time = TWEEN_DURATION,
			DelayTime = 0,
			EasingStyle = "Linear",
			EasingDirection = "InOut",
			RepeatCount = 0,
			Reverses = false,
			StepType = "Stepped",
			Goal = {
				Position = if direction == Directions.In then activePosition.Position else inActivePosition.Position,
			},
		})
		tween:Play()
		wait(TWEEN_DURATION)
	end
	useEffect(function()
		tween(Directions.In)
		wait(duration)
		tween(Directions.Out)
		if onDismiss then
			onDismiss()
		end
	end, {})
	local _attributes = {
		[Roact.Ref] = frameRef,
	}
	for _k, _v in container do
		_attributes[_k] = _v
	end
	local _children = {
		Corner = Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0, DefaultTheme.shape.borderRadius),
		}),
		Roact.createElement(Shadow),
	}
	local _length = #_children
	local _attributes_1 = {}
	for _k, _v in label do
		_attributes_1[_k] = _v
	end
	_attributes_1.Text = text
	_children.Label = Roact.createElement("TextLabel", _attributes_1)
	local _attributes_2 = {}
	for _k, _v in close do
		_attributes_2[_k] = _v
	end
	_attributes_2[Roact.Event.MouseButton1Click] = function()
		tween(Directions.Out)
		if onDismiss then
			onDismiss()
		end
	end
	_children.Close = Roact.createElement("ImageButton", _attributes_2)
	return Roact.createFragment({
		Toast = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(Toast)
return {
	default = default,
}
