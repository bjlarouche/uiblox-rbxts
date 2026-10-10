# uiblox

UI library and theming for roblox-ts. Package `@rbxts/uiblox`.

## Layout

- `src/ui/packages` components
- `src/theme` themes, palette, type, spacing, and styles (`makeStyles`, `componentStyles`)
- `src/hooks`, `src/interaction`, `src/foundation`
- `scripts` checks

## Preview

Preview and verify components through the storyblox dev plugin and `StarterGui.StorybloxViewport`. The storyblox repo's `AGENTS.md` covers the dev loop, capture, and Studio rules.

## Theme

Use theme tokens, not literals.

- Spacing: `theme.spacing` (base 8, `calc(n)`). Padding: `theme.padding` (base 4).
- Type: `theme.typography.variants` (`display`, `h1`–`h6`, `subtitle1`, `subtitle2`, `body`, `bodySmall`, `button`, `caption`, `overline`).
- Palette: `theme.palette`.
- Icons: `theme.options.constants.iconSizes` (`small` 16, `medium` 24, `large` 32). Accessory icons go through `IconButton` and the drawn icon set, not text glyphs.
- Radii: `theme.shape.radius` (`small` 2, `default` 4, `large` 8). `borderRadius` matches `default`. Capsules use `theme.shape.pillScale`.
- Elevation: `Paper` `flat`, `raised`, or `outlined`.
- Motion: `theme.motion` (`fast` 0.1, `default` 0.14, `slow` 0.24). `motionDuration` zeroes that when reduced motion is set.

## React

Bundled React is 17.2.1. No transition API.

Bare `.map()` arrays next to siblings must be Fragment-wrapped.

Use colon calls on Roblox APIs (`GetService`, `FindFirstChild`, `IsA`, `GetEnumItems`).

`DockWidgetPluginGuiInfo` fields are constructor-only.

Never `wait()` inside a React effect. Use a cancellable task.

## Commands

`pnpm test`, `pnpm build`, `pnpm pack:check`. `pnpm test` includes the tabs check and the no-internal-refs check.

## Ship

Small PRs to the default branch. Merge only on green CI.

Subject-only commits. No trailers.

No username in branch names.

Publish to npm only under the `next` tag. Leave `latest` alone unless explicitly told to move it. Keep an npm token in your environment. Never print tokens or API keys.

Never mention other UI products or company libraries in tracked files.
