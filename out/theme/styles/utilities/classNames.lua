-- Compiled with roblox-ts v2.2.0
-- eslint-disable-next-line @typescript-eslint/no-explicit-any
local classNames = function(styles)
	-- eslint-disable-next-line @typescript-eslint/no-explicit-any
	local style = {}
	local _styles = styles
	local _arg0 = function(value, key)
		if value then
			local _object = {}
			for _k, _v in style do
				_object[_k] = _v
			end
			for _k, _v in key do
				_object[_k] = _v
			end
			style = _object
		end
	end
	for _k, _v in _styles do
		_arg0(_v, _k, _styles)
	end
	local _object = {}
	for _k, _v in style do
		_object[_k] = _v
	end
	return _object
end
local default = classNames
return {
	default = default,
}
