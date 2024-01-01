-- Compiled with roblox-ts v2.2.0
local Directions
do
	local _inverse = {}
	Directions = setmetatable({}, {
		__index = _inverse,
	})
	Directions.In = "In"
	_inverse.In = "In"
	Directions.Out = "Out"
	_inverse.Out = "Out"
	Directions.Left = "Left"
	_inverse.Left = "Left"
	Directions.Right = "Right"
	_inverse.Right = "Right"
	Directions.Up = "Up"
	_inverse.Up = "Up"
	Directions.Down = "Down"
	_inverse.Down = "Down"
end
return {
	Directions = Directions,
}
