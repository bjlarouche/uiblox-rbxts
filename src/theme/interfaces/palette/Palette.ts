export interface BrandRole {
	main: Color3;
	on: Color3;
	hover: Color3;
	pressed: Color3;
}

export interface StatusRole {
	main: Color3;
	on: Color3;
	surface: Color3;
	border: Color3;
}

export default interface Palette {
	surface: {
		canvas: Color3;
		paper: Color3;
		elevated: Color3;
		overlay: Color3;
		input: Color3;
	};
	primary: BrandRole;
	accent: BrandRole;
	text: {
		primary: Color3;
		secondary: Color3;
		disabled: Color3;
		inverse: Color3;
		link: Color3;
	};
	border: Color3;
	divider: Color3;
	focus: Color3;
	action: {
		hover: Color3;
		pressed: Color3;
		selected: Color3;
		disabled: Color3;
	};
	status: {
		success: StatusRole;
		warning: StatusRole;
		error: StatusRole;
		info: StatusRole;
	};
	backdrop: Color3;
	shadow: Color3;
}
