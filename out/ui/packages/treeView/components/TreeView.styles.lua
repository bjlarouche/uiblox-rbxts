-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local _theme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme")
local createStyles = _theme.createStyles
local makeStyles = _theme.makeStyles
local useTreeViewStyles = makeStyles(function(theme)
	return createStyles({
		root = {
			Size = UDim2.new(1, -theme.padding.calc(4), 1, -theme.padding.calc(4)),
			Position = UDim2.new(0.5, 0, 0.5, 0),
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 1,
			ClipsDescendants = true,
			ZIndex = 300,
		},
		header = {
			Size = UDim2.new(1, 0, 0, theme.spacing.calc(1)),
			Position = UDim2.new(0.5, 0, 0, 0),
			AnchorPoint = Vector2.new(0.5, 0),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextYAlignment = Enum.TextYAlignment.Center,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5300,
		},
		list = {
			Size = UDim2.new(1, 0, 1, -(theme.spacing.calc(1) + theme.padding.calc(2))),
			Position = UDim2.new(0.5, 0, 0, theme.spacing.calc(1) + theme.padding.calc(2)),
			AnchorPoint = Vector2.new(0.5, 0),
			BackgroundTransparency = 1,
			AutomaticCanvasSize = Enum.AutomaticSize.XY,
			ScrollBarThickness = theme.spacing.calc(0.5),
			ScrollBarImageTransparency = 0.75,
			ClipsDescendants = true,
			ZIndex = 300,
		},
		gridLayout = {
			CellPadding = UDim2.new(0, 0, 0, 0),
			CellSize = UDim2.new(1, 0, 0, theme.spacing.calc(1) + theme.padding.calc(4)),
			FillDirection = Enum.FillDirection.Horizontal,
			FillDirectionMaxCells = 1,
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			VerticalAlignment = Enum.VerticalAlignment.Top,
			SortOrder = Enum.SortOrder.Name,
		},
		row = {
			Text = "",
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5200,
		},
		branchIcon = {
			Position = UDim2.new(0, 0, 0.5, 0),
			AnchorPoint = Vector2.new(0, 0.5),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5300,
		},
		branchTypography = {
			Size = UDim2.new(1, -(theme.spacing.calc(0.5) + theme.padding.calc(2)), 1, -theme.padding.calc(4)),
			Position = UDim2.new(1, 0, 0.5, 0),
			AnchorPoint = Vector2.new(1, 0.5),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextYAlignment = Enum.TextYAlignment.Center,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5300,
		},
		leafIcon = {
			Position = UDim2.new(0, theme.padding.calc(4), 0.5, 0),
			AnchorPoint = Vector2.new(0, 0.5),
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5300,
		},
		leafTypography = {
			Size = UDim2.new(1, -(theme.spacing.calc(1) + theme.padding.calc(6)), 1, -theme.padding.calc(4)),
			Position = UDim2.new(1, 0, 0.5, 0),
			AnchorPoint = Vector2.new(1, 0.5),
			TextXAlignment = Enum.TextXAlignment.Left,
			TextYAlignment = Enum.TextYAlignment.Center,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			ZIndex = 5300,
		},
	})
end)
local default = useTreeViewStyles
return {
	default = default,
}
