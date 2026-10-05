<img src=docs/logo.png width=60%>

# uiblox-rbxts

UI library and theming for roblox-ts projects.

## Overview

Uiblox is a roblox-ts UI kit: semantic themes, `makeStyles` / `createStyles`, and typed React components for Studio and games. Public APIs aim for familiar Material UI–style capability (props and behavior), implemented independently for Roblox Instances, input modes, and performance.

Main exports from `@rbxts/uiblox`:

-   @rbxts/uiblox -> theme
    -   An extensible Theme type + default Dark (default) and Light themes
    -   makeStyles/createStyles utilities to serve up Instance-extended property
        tables that can be applied to your React Components
    -   ThemeProvider which can wrap your application and uses Reflex to tell
        sub-components which theme to style off of (via makeStyles)
        -   Uses Reflex
-   @rbxts/uiblox -> ui
    -   Packaged and reusable typed React components

# How to use

### Installation

```
npm install @rbxts/uiblox
```

## Quickstart

1. Wrap your app (or a subtree) in `ThemeProvider` with `DarkTheme` or `LightTheme`.
2. Build styles with `makeStyles` / `createStyles` (or `componentStyles`) and spread them onto Instances.
3. For hover/press/focus/disabled (and list `_first` / `_last`), put `_hover`-style keys on the style table and call `resolveStyle(style, state)` before spreading.
4. Use packaged components from `@rbxts/uiblox` (`Button`, `Input`, `Select`, …).
5. Preview components in [Storyblox](https://github.com/bjlarouche/storyblox) with `*.stories` modules.

```tsx
import React from "@rbxts/react";
import { Button, DarkTheme, ThemeProvider } from "@rbxts/uiblox";

export function App() {
	return (
		<ThemeProvider theme={DarkTheme}>
			<Button text="Continue" onLeftClick={() => {}} />
		</ThemeProvider>
	);
}
```

## Parity checklist

Capability parity, not pixel parity. For each public component, expect:

- [ ] Typed controlled props where interaction needs state
- [ ] Theme tokens (light/dark) via `ThemeProvider`
- [ ] Style slots / variants through the styling helpers
- [ ] Disabled / loading / error when the control type warrants it
- [ ] Mouse, touch, and gamepad-friendly activation where interactive
- [ ] Cleanup and focused unit checks in-repo
- [ ] `stateMatrix` rows for visual capture planning
- [ ] A Storyblox story (dev fixtures OK)

Skipped on purpose: browser-only addons (MDX, iframes, hosted visual-review clouds).

## Example

Below is an example usage of how you could use ThemeProvider,
makeStyles/createStyles, and a Button component. This is just an example of how
to mount and configure your UI -- you can set things up however you want (so
long as it works...).

### Shared

You can house all of your components within shared.

#### src/shared/ui/app/App.tsx

The top-level class for our UI. Loads the actual ApplLayout into ScreenGui. This
is what we later pass when mounting the App.

```javascript
import React, { Component } from "@rbxts/react";

class App extends Component {
	render() {
		return (
			<screengui IgnoreGuiInset ZIndexBehavior={Enum.ZIndexBehavior.Global}>
				<AppLayout />
			</screengui>
		);
	}
}

export default App;
```

#### src/shared/ui/app/AppLayout.tsx

Start actually adding in components to render, but wrap them in a
`ThemeProvider`. Here I just use DarkTheme, which is also exported as
DefaultTheme. If no theme is provided, it would use DarkTheme anyways. If the
theme prop changes, then sub-components will be re-rendered with the new theme.

You can also choose to create your own theme with the `Theme` interface exported
from `@rbxts/uiblox`.

```javascript
import React, { Component } from "@rbxts/react";
import { Storyblox } from "shared/ui/storyblox";
import { DarkTheme, ThemeProvider } from "@rbxts/uiblox";
import usePageLayoutStyles from "./PageLayout.styles";

class AppLayout extends Component {
	render() {
		return (
			<ThemeProvider theme={DarkTheme}>
				<frame key={"AppLayout"} Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
					<MyComponent />
				</frame>
			</ThemeProvider>
		);
	}
}

export default AppLayout;
```

#### src/shared/ui/myComponent/MyComponent.tsx

My actual component. Just loads a dummy button and passes props to be used to
make styles.

If you omit the props type from myStyles usage in the styles file,
then you can omit props without a type warning (i.e. `makeStyles(theme => {})`
instead of `makeStyles<MyComponentProps>((theme, props) => {})`).

```javascript
import React, { useState } from "@rbxts/react";
import useMyComponentStyles from "./MyComponent.styles";
import { Button } from "@rbxts/uiblox";

export interface MyComponentProps {
  title?: string;
  bolded?: boolean;
  transparent?: boolean;
}

// Hooked components are very handy
function MyComponent(props: MyComponentProps) {
  const { title, bolded = false } = props;
  const { root, button } = useMyComponentStyles(props);

  return (
    <frame key="MyComponent" {...root}>
      <Button
        variant="outlined"
        text={title}
        size="small"
        color="secondary"
        family={bolded ? "bold" : "default"}
        className={button}
      ></Button>
    </frame>
  );
};

export default markPureComponent(MyComponent);
```

#### src/shared/ui/myComponent/MyComponent.styles.ts

Actually compute styles based on theme and props. You can simplify the arrow
function if you do not care about props and just directly return `createStyles`.

For more complex dendencies, you'd likely use some helper methods within the
arrow function of `makeStyles` (i.e. `makeRootStyles()`).

Make sure that the type given to each style matches the component it will be
applied to (i.e. `frameStyles: { ... } as WriteableStyle<Frame>` =>
`<frame {...frameStyles} />`).

```javascript
import { createStyles, Icons, makeStyles, ROBLOX_UI_OFFSET, Theme, WriteableStyle } from "@rbxts/uiblox";
import { MyComponentProps } from "./MyComponent";

const useMyComponentStyles = makeStyles<MyComponentProps>((theme: Theme, props: MyComponentProps) => {
  const { transparent = false } = props; // Defaults to false
  const transparency = transparent ? 1 : 0;

  return createStyles({
    root: {
      Size: new UDim2(0, theme.spacing.calc(6), 0, theme.spacing.calc(6)),
      BackgroundColor3: Color3.fromRGB(0, 0, 0),
      BackgroundTransparency: transparency,
      BorderSizePixel: 0,
      ClipsDescendants: true,
      ZIndex: 100,
    } as WriteableStyle<Frame>,
    button: {
      Position: new UDim2(0.5, theme.padding.calc(2), 0.5, theme.padding.calc(2)),
      AnchorPoint: new Vector2(0.5, 0.5),
      ZIndex: 200,
    } as WriteableStyle<TextButton>
  })
});

export default useMyComponentStyles;
```

### Style precedence

Components spread their own styles first, then `className`, then the props that
carry state. Later always wins:

1. Component styles from the theme
2. `className` (merge several with `cx(a, condition && b)`; later args win, falsy
   args are skipped)
3. State props the component owns: `Active`, `Selectable`, `Text`, and the
   value-driven sizes/positions of Slider, SplitPane, and so on

So `className` can restyle anything except a control's state. Pass `disabled`
instead of overriding `Active`.

### Controls

Inputs are controlled: `{ value, onChange, disabled? }`. They call `onChange`
only when the value actually changes, and never while disabled.

| Component | Value | Notes |
| --- | --- | --- |
| Checkbox | `boolean` | `mixed` shows indeterminate; activating commits `true` |
| Switch | `boolean` | |
| RadioGroup / Select / Tabs | `T` from `options: { label, value: T, disabled? }[]` | compared by identity; disabled options are skipped |
| NumberInput | `number` | commits on focus lost or Enter; clamps to `min`/`max`, snaps to `step` |
| Slider | `number` | `onChange` while dragging, `onCommit` on release |
| SplitPane | first pane size (px) | display clamps to `min`/`max`; Escape cancels a drag |
| Input | `text` | `onInput` while typing, `onTextChanged` on commit |

Select and Tooltip render through `Popup`, which portals into the nearest
`LayerCollector` so clipping parents do not cut them off. The popup follows its
anchor when that anchor moves or resizes, and Select closes if the anchor leaves
the layer. Select handles Up, Down, Enter, and Escape while it is open or
selected, including when the pointer is not over it.

### Loading

`Skeleton` covers a block that is still loading. `variant` is `text`,
`rectangular`, `rounded`, or `circular`. `width` and `height` are pixels.
`lines` and `gap` stack text rows. `SkeletonText` is the text variant.
`animation` is `pulse`, `shimmer`, or `false`. `reducedMotion` holds the block
still. A later theme preference can set that prop for you.

`CircularProgress` spins while `value` is omitted. A `value` from 0 to 1 draws
an arc and stops the spin. `size`, `thickness`, and `color` restyle the ring.
`LinearProgress` is the existing `ProgressBar`: pass `value` from 0 to 1 or
`progress` from 0 to 100. `indeterminate` slides the bar. `disabled` and
`reducedMotion` stop the motion and fade the fill.

`Button` and `IconButton` take `loading`. The control ignores clicks, hover,
and focus while loading, and its size stays put. `loadingLabel` replaces the
caption. `loadingPosition` is `start`, `center`, or `end`. `reducedMotion`
keeps the spinner still.

### State captures

`stateMatrix` is the gallery list for Storyblox. Each row is one shot: `theme`
(`Dark` or `Light`), `width`, and `pointer` (`rest`, `hover`, `press`, or
`focus`). Rows are built in small helper functions and concatenated so the
compiled Luau chunk stays under the 200-local register limit. `open` means the
Select list is showing. `options` and `disabledOption` build RadioGroup, Select,
and Tabs. `selected` and `filter` are TreeView. `value`, `text`, `disabled`,
`loading`, `mixed`, `hasError`, and `placeholder` are that control's props.
`variant`, `animation` (`pulse`, `shimmer`, or `false`), `reducedMotion`, and
`indeterminate` cover skeleton and progress shots. Those shots stay still when
`animation` is `false` or `reducedMotion` is set. Hover, press, and focus rows
are only there when the control actually changes.

### Client

Some sample logic for mounting app when player spawns (on client).

#### src/client/Controllers/Apploader.tsx

Mount the App in the LocalPlayer's `PlayerGui`.

```javascript
import Log from "@rbxts/log";
import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { APP_CONTAINER_NAME } from "shared/constants/AppConstants";
import App from "shared/packages/ui/app/components/App";

class AppLoader {
	protected root: React.ReactNode | undefined;

	Mount() {
		const playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui");

		if (!playerGui) {
			Log.Error("PlayerGui not found");
			return;
		}

		const root = createRoot(new Instance("Folder"));

		root.render(<StrictMode>{createPortal(<App key={APP_CONTAINER_NAME} />, playerGui)}</StrictMode>);
		Log.Info("App mounted");
	}
}

export default AppLoader;
```

#### src/client/main.client.ts

When the client loads, call our AppLoader() to mount the UI.

```javascript
import { AppLoader } from "./Controllers";

// Load the UI App
new AppLoader().Mount();
```

# Future work

-   More UI packages

# See Also

-   [Storyblox](https://github.com/bjlarouche/storyblox) a UI component explorer for roblox-ts developers
    -   <img src=docs/storyblox-preview.png width=40%>
    -   Test it out here [Storyblox Pre-Release Experience](https://www.roblox.com/games/9159382473)
    -   Similar to [hoarcekat](https://github.com/Kampfkarren/hoarcekat) by Kampfkarren
