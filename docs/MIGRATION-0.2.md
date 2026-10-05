# Uiblox 0.2.0 theme migration

Breaking: `theme.palette` is a semantic token map. `theme.options.constants.colors` and `extendedPalette` are removed. Raw scales (`Blue`, `Gray`, …) stay package exports for custom themes.

## Map

| Before | After |
| --- | --- |
| `palette.background.default` | `palette.surface.canvas` |
| `palette.background.paper` | `palette.surface.paper` / `elevated` / `overlay` / `input` |
| `palette.primary.main` (was green) | `palette.primary.main` (blue) + `primary.on` / `hover` / `pressed` |
| `palette.secondary.main` (was blue) | `palette.primary.main` or `palette.accent.main` |
| `palette.text.primary` / `secondary` | same; also `disabled`, `inverse`, `link` |
| `palette.divider` | `palette.divider` (decorative) or `palette.border` / `focus` |
| `palette.error/warning/success.main` | `palette.status.*.main` (+ `on`, `surface`, `border`) |
| `options.constants.colors.backgroundUI*` | `palette.surface.*` |
| `options.constants.colors.textMuted` | `palette.text.secondary` |
| `options.constants.colors.navigationBar` | `palette.surface.elevated` |
| `options.constants.colors.alert/caution/link` | `palette.status.error` / `warning` / `text.link` |
| `options.constants.extendedPalette.*` | import scale from `@rbxts/uiblox` |

## Styles

`makeStyles` keeps one result per theme object and primitive prop key. Strings, numbers, booleans, and datatypes (`Color3`, `UDim`, `UDim2`, vectors, `EnumItem`, `CFrame`, `BrickColor`) are part of the key. Callbacks, instances, and tables count only as present or absent. Do not mutate the tables it returns.

`applyVariants` merges slot tables in this order. Later layers win:

1. Base slots
2. Variant groups, in source order. Boolean and number values match the string keys `"true"` and `"1"`
3. Compound variants, in array order
4. `theme.components.<Name>.styleOverrides`

`componentStyles("Button", factory)` reads that entry. `defaultProps` fills props the caller left unset, before the factory runs. `styleOverrides` merge onto the slots after that. Replace the theme object to change either one.

`resolveStyle(style, state)` peels selector keys from a style table and merges the active ones. Order: `_hover`, `_pressed`, `_focus`, `_selected`, `_checked`, `_first`, `_last`, then `_disabled`. A later key wins. Call it before spreading onto an Instance. Selector keys are stripped from the result.

```ts
const painted = resolveStyle(
	{
		BackgroundTransparency: 0,
		_hover: { BackgroundTransparency: 0.1 },
		_pressed: { BackgroundTransparency: 0.2 },
		_focus: { Text: "Focus" },
		_first: { LayoutOrder: 0 },
		_last: { LayoutOrder: 99 },
		_disabled: { BackgroundTransparency: 0.5 },
	},
	{ hover: true, first: index === 0, last: index === count - 1, disabled },
);
```

`interactionStyle(base, slots, state)` is the same resolver with separate slot tables (`hover` / `pressed` / `focused` / `disabled`). Prefer `_hover` keys on the style object when writing new code.

On the instance, `className` then `sx`. `sx` wins. Kit components do not call `resolveStyle` on `sx` yet — resolve yourself before spreading, or keep selector keys off `className` / `sx`.

`resolveResponsive` reads a plain value or `{ phone, tablet, desktop }` against `breakpointName`. A wider breakpoint falls back to the next smaller one that is set. Phone is under 600, tablet under 960, and the rest is desktop.

## Motion

`theme.reducedMotion` is the default. A `reducedMotion` prop still wins when it is set. Select, switch, skeleton, and progress read that through `useReducedMotion`.

## Density and spacing

`theme.spacing` uses an 8px base (`SPACING_BASE`). `theme.density` is `comfortable` (default) or `compact`. Unset control `size` follows density via `controlMetrics` (Button included). Icon tokens are 16 / 24 / 32. Body text is 14.

`pnpm test` runs `scripts/density.check.mjs`.

## Contrast

`pnpm test` runs `scripts/contrast.check.mjs`. Targets: normal text ≥4.5:1, UI/focus/border ≥3:1. Exceptions: decorative `divider`, `text.disabled`, `action.disabled`.
