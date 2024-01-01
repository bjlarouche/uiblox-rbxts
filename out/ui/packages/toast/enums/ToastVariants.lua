-- Compiled with roblox-ts v2.2.0
local ToastVariants
do
	local _inverse = {}
	ToastVariants = setmetatable({}, {
		__index = _inverse,
	})
	ToastVariants.default = "default"
	_inverse.default = "default"
	ToastVariants.success = "success"
	_inverse.success = "success"
	ToastVariants.error = "error"
	_inverse.error = "error"
	ToastVariants.warning = "warning"
	_inverse.warning = "warning"
end
local default = ToastVariants
return {
	default = default,
}
