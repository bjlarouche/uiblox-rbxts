<img src=docs/logo.png width=60%>

# uiblox-rbxts

> This package is a work in progress.

UI Library and theming for roblox-ts projects.

## Background

Roblox has their own internal design system, coined "uiblox-web", that it uses for its new
web-facing products. This system offers reusable components, implemented in
React Typescript, that are derived from material UI (MUI). As well, it offers a
common theme/pallete for consistent UI/UX.

Anyone is able to view their design system as
[UIBlox-Web](https://uiblox.roblox.com). You can see that they leverage
[Storybook](https://storybook.js.org), a UI component explorer for frontend
developers, to render component previews.

Design systems all help engineers cut down on implementation time and ensure
consitent UX across products.

## Overview

So what is uiblox-rbxts? Simply put, its my stab at a design system that mimics
uiblox-web for games written using roblox-ts.

UIBlox-rbxts aims to provide extensible components that can be reusable by
anyone who installs this npm package. It also offers a theme and styling system
that aids UI/UX consistentency.

How does it do this? Well, there are two main exports from this package:

- @rbxts/uiblox -> theme
  - An extensible Theme type + default Dark (default) and Light themes
    - ... Light theme palette is a WIP
  - makeStyles/createStyles utilities to serve up Instance-extended property
    tables that can be applied to your Roact Components
  - ThemeProvider which can wrap your application and uses Rodux to tell
    sub-components which theme to style off of (via makeStyles)
    - Uses Rodux
- @rbxts/uiblox -> ui
  - Packaged and reusable typed Roact components

# How to use

### Installation

Install the package to get started.

`npm install @rbxts/uiblox`

## Example

Below is an example usage of how you could use ThemeProvider,
makeStyles/createStyles, and a Button component. This is just an example of how
to mount and configure your UI -- you can set things up however you want (so
long as it works...).

### Shared

You can house all of your components within shared.

#### src/shared/ui/app/App.tsx

The top-level class for our UI. Loads the actual ApplLayout into ScreenGui. This
is what we later pass to `Roact.mount()`.

```javascript
import Roact, { Component } from "@rbxts/roact";

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
import Roact, { Component } from "@rbxts/roact";
import { Storyblox } from "shared/ui/storyblox";
import { DarkTheme, ThemeProvider } from "@rbxts/uiblox";
import usePageLayoutStyles from "./PageLayout.styles";

class AppLayout extends Component {
  render() {
    return (
      <ThemeProvider theme={DarkTheme}>
        <frame
          Key={"AppLayout"}
          Size={new UDim2(1, 0, 1, 0)}
          BackgroundTransparency={1}
        >
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
import Roact from "@rbxts/roact";
import { useState } from "@rbxts/roact-hooked";
import useMyComponentStyles from "./MyComponent.styles";
import { Button } from "@rbxts/uiblox";

export interface MyComponentProps {
  title?: string;
  bolded?: boolean;
  transparent?: boolean;
}

// Hooked components are very handy
const MyComponent =
  hooked <
  MyComponentProps >
  ((props) => {
    const { title, bolded = false } = props;
    const { root, button } = useMyComponentStyles(props);

    return (
      <frame Key="MyComponent" {...root}>
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
  });

export default MyComponent;
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

### Client

Some sample logic for mounting app when player spawns (on client).

#### src/client/Controllers/Apploader.tsx

Mount the App in the LocalPlayer's `PlayerGui`.

```javascript
import Roact, { Tree } from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { App } from "shared/ui/App";

class AppLoader {
	protected _tree: Tree | undefined;

	Mount() {
		const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as PlayerGui;

		const appComponent = <App />;
		this._tree = Roact.mount(appComponent, playerGui, "App");
		print("App mounted");
	}

	Unmount() {
		if (this._tree) {
			Roact.unmount(this._tree);
			print("App unmounted");
		}
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

- More UI packages
- Finish palette for LightTheme

# See Also

- [Storyblox](https://github.com/bjlarouche/storyblox) a UI component explorer for roblox-ts developers
  - <img src=docs/storyblox-preview.png width=40%>
  - Test it out here [Storyblox Pre-Release Experience](https://www.roblox.com/games/9159382473)
  - Similar to [hoarcekat](https://github.com/Kampfkarren/hoarcekat) by Kampfkarren
