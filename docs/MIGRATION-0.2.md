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

## Contrast

`pnpm test` runs `scripts/contrast.check.mjs`. Targets: normal text ≥4.5:1, UI/focus/border ≥3:1. Exceptions: decorative `divider`, `text.disabled`, `action.disabled`.
