import { INITIAL_THEME_STATE } from "theme/constants";
import { ThemeActionTypes } from "theme/enums";
import { ThemeAction, ThemeState } from "theme/types";

function themeReducer(state: ThemeState | undefined, action: ThemeAction): ThemeState {
	if (action.type === ThemeActionTypes.Hydrate) {
		return { ...INITIAL_THEME_STATE, theme: action.theme || INITIAL_THEME_STATE.theme };
	}

	if (!state) {
		throw error("State is undefined");
	}

	if (action.type === ThemeActionTypes.SetTheme) {
		return {
			...state,
			theme: action.theme,
		};
	}

	throw error(`Unhandled action type: ${action}`);
}

export default themeReducer;
