import { ThemeActionTypes } from "theme/enums";
import { Theme } from "../interfaces";

export interface ThemeState {
	theme: Theme;
}

export type ThemeAction =
	| { type: ThemeActionTypes.Hydrate; theme?: Theme }
	| {
			type: ThemeActionTypes.SetTheme;
			theme: Theme;
	  };

export type ThemeDispatch = React.Dispatch<ThemeAction>;
