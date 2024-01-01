import { Blue, Colors, Common, Gray, Green, Purple, Red, Yellow } from "theme/interfaces/Palette/Colors";
import { Borders } from "../interfaces/Spacing";

// dark theme
export const DARK_THEME_COLORS: Colors = {
	backgroundDefault: Common.Black,
	backgroundContrast: Gray[110],
	backgroundMuted: Gray[90],
	backgroundUIDefault: Gray[90],
	backgroundUIMuted: Gray[100],
	backgroundUIContrast: Gray[100],
	UIDefault: Gray[70],
	UIMuted: Gray[100],
	UIEmphasis: Gray[80],
	textDefault: Common.White,
	textMuted: Gray[50],
	textEmphasis: Common.White,
	iconDefault: Common.White,
	iconEmphasis: Common.White,
	iconOnHover: Common.White,
	systemPrimaryDefault: Common.White,
	systemPrimaryOnHover: Gray[40],
	systemPrimaryContent: Common.Black,
	contextualPrimaryDefault: Green[50],
	contextualPrimaryOnHover: Green[40],
	contextualPrimaryContent: Common.Black,
	secondaryDefault: Common.White,
	secondaryOnHover: Gray[40],
	secondaryContent: Common.White,
	divider: Gray[70],
	overlay: Common.Black,
	dropShadow: Common.Black,
	navigationBar: Gray[110],
	badge: Common.White,
	badgeContent: Common.Black,
	placeholder: Gray[100],
	online: Green[50],
	offline: Gray[50],
	alert: Red[60],
	success: Green[50],
	accent: Purple[50],
	link: Blue[50],
	caution: Yellow[50],
	text: Common.White,
	background: Common.Black,
};

export const LIGHT_THEME_COLORS: Colors = {
	backgroundDefault: Common.White,
	backgroundContrast: Gray[40],
	backgroundMuted: Gray[30],
	backgroundUIDefault: Gray[30],
	backgroundUIMuted: Gray[50],
	backgroundUIContrast: Gray[50],
	UIDefault: Gray[70], //TODO
	UIMuted: Gray[50],
	UIEmphasis: Gray[80], //TODO
	textDefault: Common.Black,
	textMuted: Gray[50], //TODO
	textEmphasis: Common.Black,
	iconDefault: Common.Black,
	iconEmphasis: Common.Black,
	iconOnHover: Common.Black,
	systemPrimaryDefault: Common.Black,
	systemPrimaryOnHover: Gray[40], //TODO
	systemPrimaryContent: Common.White,
	contextualPrimaryDefault: Green[60],
	contextualPrimaryOnHover: Green[40], //TODO
	contextualPrimaryContent: Common.White,
	secondaryDefault: Common.Black,
	secondaryOnHover: Gray[40], //TODO
	secondaryContent: Common.Black,
	divider: Gray[70], //TODO
	overlay: Common.White,
	dropShadow: Common.White,
	navigationBar: Gray[40],
	badge: Common.Black,
	badgeContent: Common.White,
	placeholder: Gray[50],
	online: Green[60],
	offline: Gray[50], //TODO
	alert: Red[60], //TODO
	success: Green[60],
	accent: Purple[50], //TODO
	link: Blue[50], //TODO
	caution: Yellow[50], //TODO
	text: Common.Black,
	background: Common.White,
};

export const DEFAULT_BORDERS: Borders = {
	default: 1,
	divider: 2,
};
