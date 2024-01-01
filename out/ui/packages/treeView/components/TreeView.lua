-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local Roact = TS.import(script, TS.getModule(script, "@rbxts", "roact").src)
local _roact_hooked = TS.import(script, TS.getModule(script, "@rbxts", "roact-hooked").src)
local markPureComponent = _roact_hooked.markPureComponent
local useCallback = _roact_hooked.useCallback
local useEffect = _roact_hooked.useEffect
local useState = _roact_hooked.useState
local DefaultTheme = TS.import(script, script.Parent.Parent.Parent.Parent.Parent, "theme").DefaultTheme
local Icon = TS.import(script, script.Parent.Parent.Parent, "icon").Icon
local Typography = TS.import(script, script.Parent.Parent.Parent, "typography").Typography
local Icons = TS.import(script, script.Parent.Parent.Parent.Parent, "enums").Icons
local useTreeViewStyles = TS.import(script, script.Parent, "TreeView.styles").default
local function TreeView(props)
	local _binding = props
	local tree = _binding.tree
	local icon = _binding.icon
	local filter = _binding.filter
	local className = _binding.className
	local _binding_1 = useTreeViewStyles()
	local root = _binding_1.root
	local header = _binding_1.header
	local list = _binding_1.list
	local gridLayout = _binding_1.gridLayout
	local row = _binding_1.row
	local branchIcon = _binding_1.branchIcon
	local branchTypography = _binding_1.branchTypography
	local leafIcon = _binding_1.leafIcon
	local leafTypography = _binding_1.leafTypography
	local selectedBranch, setSelectedBranch = useState()
	local selectedLeaf, setSelectedLeaf = useState()
	local expanded, setExpanded = useState({})
	local canvasSize, setCanvasSize = useState(UDim2.new(0, 0, 0, 0))
	local resizeScrollingFrame = function(rbx, child)
		if child and not child:IsA("GuiObject") then
			return nil
		end
		local height = 0
		local _exp = rbx:GetChildren()
		local _arg0 = function(c)
			if c:IsA("GuiObject") then
				height += c.AbsoluteSize.Y
			end
		end
		for _k, _v in _exp do
			_arg0(_v, _k - 1, _exp)
		end
		TS.try(function()
			setCanvasSize(UDim2.new(0, 0, 0, height))
		end, function()
			-- Component is unmounting. Do nothing.
		end)
	end
	local matchesFilter = useCallback(function(title)
		local isMatch = false
		local _condition = filter == nil
		if not _condition then
			local _result = filter
			if _result ~= nil then
				_result = #_result
			end
			_condition = _result == 0
		end
		if _condition then
			return true
		end
		local parts = string.split(title, "/")
		local _arg0 = function(part)
			if #part >= #filter and string.sub(string.upper(part), 1, #filter) == string.upper(filter) then
				isMatch = true
			end
		end
		for _k, _v in parts do
			_arg0(_v, _k - 1, parts)
		end
		return isMatch
	end, { filter })
	-- Automatically expand branches that match filter
	useEffect(function()
		local _condition = filter == nil
		if not _condition then
			local _result = filter
			if _result ~= nil then
				_result = #_result
			end
			_condition = _result == 0
		end
		if _condition then
			setExpanded({})
			return nil
		end
		local newExpanded = {}
		-- Figure out which branches should be expanded
		local _branches = tree.branches
		local _arg0 = function(branch)
			local matchesBranchFilter = matchesFilter(branch.title)
			if matchesBranchFilter then
				-- If branch is a match, whole branch should be expanded
				local _branch = branch
				if not (table.find(newExpanded, _branch) ~= nil) then
					local _branch_1 = branch
					table.insert(newExpanded, _branch_1)
				end
			else
				-- If any of the leaves are a match, branch should be expanded
				local _leaves = branch.leaves
				local _arg0_1 = function(leaf)
					local _branch = branch
					if table.find(newExpanded, _branch) ~= nil then
						return nil
					end
					local matchesLeafFilter = matchesFilter(leaf.title)
					if matchesLeafFilter then
						local _branch_1 = branch
						table.insert(newExpanded, _branch_1)
					end
				end
				for _k, _v in _leaves do
					_arg0_1(_v, _k - 1, _leaves)
				end
			end
		end
		for _k, _v in _branches do
			_arg0(_v, _k - 1, _branches)
		end
		-- Set expanded to new array
		setExpanded(newExpanded)
	end, { tree, filter })
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
	local _object = {
		Text = tree.title,
	}
	for _k, _v in header do
		_object[_k] = _v
	end
	_attributes_1.className = _object
	_attributes_1.color = "textSecondary"
	_attributes_1.variant = "body"
	_attributes_1.family = "bold"
	_children[_length + 1] = Roact.createElement(Typography, _attributes_1)
	local _attributes_2 = {}
	for _k, _v in list do
		_attributes_2[_k] = _v
	end
	_attributes_2.CanvasSize = canvasSize
	_attributes_2[Roact.Event.AncestryChanged] = resizeScrollingFrame
	_attributes_2[Roact.Event.ChildAdded] = resizeScrollingFrame
	_attributes_2[Roact.Event.ChildRemoved] = resizeScrollingFrame
	local _children_1 = {}
	local _length_1 = #_children_1
	local _attributes_3 = {}
	for _k, _v in gridLayout do
		_attributes_3[_k] = _v
	end
	_children_1[_length_1 + 1] = Roact.createElement("UIGridLayout", _attributes_3)
	local _branches = tree.branches
	local _arg0 = function(branch, branchIndex)
		local matchesBranchFilter = matchesFilter(branch.title)
		local hasMatchingLeaf = matchesBranchFilter
		if not hasMatchingLeaf then
			for _, leaf in branch.leaves do
				if matchesFilter(leaf.title) then
					hasMatchingLeaf = true
					break
				end
			end
		end
		if matchesBranchFilter or hasMatchingLeaf then
			local _children_2 = {}
			local _length_2 = #_children_2
			local _attributes_4 = {}
			for _k, _v in row do
				_attributes_4[_k] = _v
			end
			_attributes_4[Roact.Event.MouseButton1Click] = function()
				if branch.onClick then
					branch.onClick()
				end
				-- If there are leaves... Expand/Collapse
				if #branch.leaves > 0 then
					local _branch = branch
					local isExpanded = table.find(expanded, _branch) ~= nil
					if isExpanded then
						setExpanded(function(oldExpanded)
							local _oldExpanded = oldExpanded
							local _arg0_1 = function(b)
								return b ~= branch
							end
							-- ▼ ReadonlyArray.filter ▼
							local _newValue = {}
							local _length_3 = 0
							for _k, _v in _oldExpanded do
								if _arg0_1(_v, _k - 1, _oldExpanded) == true then
									_length_3 += 1
									_newValue[_length_3] = _v
								end
							end
							-- ▲ ReadonlyArray.filter ▲
							return _newValue
						end)
					else
						setExpanded(function(oldExpanded)
							local _array = {}
							local _length_3 = #_array
							local _oldExpandedLength = #oldExpanded
							table.move(oldExpanded, 1, _oldExpandedLength, _length_3 + 1, _array)
							_length_3 += _oldExpandedLength
							_array[_length_3 + 1] = branch
							return _array
						end)
					end
				else
					setSelectedBranch(branch)
				end
			end
			local _condition = #branch.leaves > 0
			if _condition then
				local _attributes_5 = {}
				local _branch = branch
				_attributes_5.icon = if table.find(expanded, _branch) ~= nil then Icons.Expanded else Icons.Collapsed
				_attributes_5.size = "xxs"
				_attributes_5.className = branchIcon
				_attributes_5.tint = DefaultTheme.options.constants.extendedPalette.Gray[70]
				_condition = (Roact.createElement(Icon, _attributes_5))
			end
			local _children_3 = {}
			local _length_3 = #_children_3
			if _condition then
				_children_3[_length_3 + 1] = _condition
			end
			_length_3 = #_children_3
			local _attributes_5 = {
				text = branch.title,
			}
			local _object_1 = {}
			for _k, _v in branchTypography do
				_object_1[_k] = _v
			end
			_attributes_5.className = _object_1
			_attributes_5.color = "textPrimary"
			_attributes_5.variant = "body"
			_attributes_5.family = if selectedBranch == branch then "bold" else "default"
			_children_3[_length_3 + 1] = Roact.createElement(Typography, _attributes_5)
			_children_2[branch.title .. ("-" .. tostring(branchIndex))] = Roact.createFragment({
				[branch.title .. ("-" .. tostring(branchIndex))] = Roact.createElement("TextButton", _attributes_4, _children_3),
			})
			local _branch = branch
			local _condition_1 = table.find(expanded, _branch) ~= nil
			if _condition_1 then
				local _leaves = branch.leaves
				local _arg0_1 = function(leaf, leafIndex)
					local matchesLeafFilter = matchesFilter(leaf.title)
					if matchesBranchFilter or matchesLeafFilter then
						local _attributes_6 = {}
						for _k, _v in row do
							_attributes_6[_k] = _v
						end
						_attributes_6[Roact.Event.MouseButton1Click] = function()
							setSelectedLeaf(leaf)
							setSelectedBranch(branch)
							if leaf.onClick then
								leaf.onClick()
							end
						end
						local _children_4 = {
							Roact.createElement(Icon, {
								icon = icon or Icons.ListPrimary,
								size = "xs",
								className = leafIcon,
								tint = DefaultTheme.palette.secondary.main,
							}),
						}
						local _length_4 = #_children_4
						local _attributes_7 = {
							text = leaf.title,
						}
						local _object_2 = {}
						for _k, _v in leafTypography do
							_object_2[_k] = _v
						end
						_attributes_7.className = _object_2
						_attributes_7.color = "textPrimary"
						_attributes_7.variant = "body"
						_attributes_7.family = if selectedLeaf == leaf then "bold" else "default"
						_children_4[_length_4 + 1] = Roact.createElement(Typography, _attributes_7)
						return Roact.createFragment({
							[branch.title .. ("-" .. (tostring(branchIndex) .. ("-" .. (leaf.title .. ("-" .. tostring(leafIndex))))))] = Roact.createElement("TextButton", _attributes_6, _children_4),
						})
					else
						return Roact.createFragment()
					end
				end
				-- ▼ ReadonlyArray.map ▼
				local _newValue = table.create(#_leaves)
				for _k, _v in _leaves do
					_newValue[_k] = _arg0_1(_v, _k - 1, _leaves)
				end
				-- ▲ ReadonlyArray.map ▲
				_condition_1 = _newValue
			end
			if _condition_1 then
				for _k, _v in _condition_1 do
					_children_2[_length_2 + _k] = _v
				end
			end
			return Roact.createFragment(_children_2)
		else
			return Roact.createFragment()
		end
	end
	-- ▼ ReadonlyArray.map ▼
	local _newValue = table.create(#_branches)
	for _k, _v in _branches do
		_newValue[_k] = _arg0(_v, _k - 1, _branches)
	end
	-- ▲ ReadonlyArray.map ▲
	for _k, _v in _newValue do
		_children_1[_length_1 + 1 + _k] = _v
	end
	_children.List = Roact.createElement("ScrollingFrame", _attributes_2, _children_1)
	return Roact.createFragment({
		TreeView = Roact.createElement("Frame", _attributes, _children),
	})
end
local default = markPureComponent(TreeView)
return {
	default = default,
}
