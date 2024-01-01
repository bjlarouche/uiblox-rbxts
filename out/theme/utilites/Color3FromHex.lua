-- Compiled with roblox-ts v2.2.0
local Color3FromHex = function(hex)
	local hextStr, _ = string.gsub(hex, "#", "")
	local bigint = tonumber(hextStr, 16)
	assert(bigint ~= 0 and (bigint == bigint and bigint), "Color3FromHex: Invalid hex value")
	local r = bit32.band((bit32.arshift(bigint, 16)), 255)
	local g = bit32.band((bit32.arshift(bigint, 8)), 255)
	local b = bit32.band(bigint, 255)
	return Color3.fromRGB(r, g, b)
end
local default = Color3FromHex
return {
	default = default,
}
