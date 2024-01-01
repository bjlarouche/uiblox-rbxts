-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local DefaultTheme = TS.import(script, script.Parent.Parent.Parent, "themes").default
local themeStore = TS.import(script, script.Parent.Parent.Parent, "components", "ThemeStore").themeStore
local makeStyles = function(f)
	return function(props)
		local _exitType, _returns = TS.try(function()
			local theme = themeStore:getState().theme
			local _fn = f
			local _exp = theme or DefaultTheme
			local _condition = props
			if _condition == nil then
				_condition = {}
			end
			return TS.TRY_RETURN, { _fn(_exp, _condition) }
		end, function(e)
			local _fn = f
			local _condition = props
			if _condition == nil then
				_condition = {}
			end
			return TS.TRY_RETURN, { _fn(DefaultTheme, _condition) }
		end)
		if _exitType then
			return unpack(_returns)
		end
	end
end
local default = makeStyles
return {
	default = default,
}
