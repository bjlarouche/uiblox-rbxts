-- Compiled with roblox-ts v2.2.0
local Orientations
do
	local _inverse = {}
	Orientations = setmetatable({}, {
		__index = _inverse,
	})
	Orientations.Vertical = "Vertical"
	_inverse.Vertical = "Vertical"
	Orientations.Horizontal = "Horizontal"
	_inverse.Horizontal = "Horizontal"
end
return {
	Orientations = Orientations,
}
