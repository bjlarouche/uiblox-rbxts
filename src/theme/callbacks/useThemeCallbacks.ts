import { useMemo } from "@rbxts/react";
import { ThemeActionTypes } from "theme/enums";
import { useTheme } from "theme/hooks";
import { Theme } from "theme/interfaces";

function useThemeCallbacks() {
  const { dispatch } = useTheme();
  return useMemo(() => {
    return dispatch
      ? {
          onSetTheme: (theme: Theme) => dispatch({ type: ThemeActionTypes.SetTheme, theme }),
        }
      : {};
  }, [dispatch]);
}

export default useThemeCallbacks;