# Uiblox styling tokens

Short guide for theme tokens and style helpers. Prefer tokens over magic numbers.

## Spacing

| Token | Value | Use |
| --- | --- | --- |
| `SPACING_BASE` / `theme.spacing.default` | 8 | Gaps, layout multiples |
| `theme.spacing.calc(n)` | `8 * n` | `calc(1)`=8, `calc(2)`=16 |
| `PADDING_BASE` / `theme.padding.default` | 4 | Tight insets |
| `theme.padding.calc(n)` | `4 * n` | Control chrome padding |

```ts
Padding: new UDim(0, theme.spacing.calc(1));
PaddingLeft: new UDim(0, theme.padding.calc(2));
```

## Density

| `theme.density` | Unset control `size` | Typical use |
| --- | --- | --- |
| `comfortable` (default) | `medium` | Games, dialogs |
| `compact` | `small` | Studio Properties / dense chrome |

`controlMetrics(density, size)` returns heights, switch track, fonts, button size, etc. Pass an explicit `size` to override density.

## Typography

Variants live on `theme.typography.variants` (size + family + weight). `fontSizes` / `fontFamilies` stay for direct access.

| Variant | Size | Family | Weight |
| --- | --- | --- | --- |
| h1 | 28 | bold | 700 |
| h2 | 22 | bold | 700 |
| h3 | 18 | semibold | 600 |
| h4 | 16 | semibold | 600 |
| h5 / h6 | 14 | semibold | 600 |
| subtitle1 | 16 | default | 400 |
| subtitle2 | 14 | semibold | 600 |
| body | 14 | default | 400 |
| button | 13 | semibold | 600 |
| caption | 12 | default | 400 |
| overline | 10 | default | 400 |

Families: `default` / `bold` / `semibold` / `light` / `italics` → SourceSans*. TextLabel uses `Font`; `weight` is for docs / FontFace.

```tsx
<Typography variant="h3" text="Title" />
// TextSize 18, Font SourceSansSemibold unless `family` is set
```

## Shape

| Token | Value | Use |
| --- | --- | --- |
| `theme.shape.borderRadius` | 4 | Button, Input, Paper |
| `theme.shape.pillScale` | 1 | Switch, Chip → `new UDim(pillScale, 0)` |

## Palette roles

| Role | Keys | Use |
| --- | --- | --- |
| Surface | `canvas` `paper` `elevated` `overlay` `input` | Backgrounds |
| Text | `primary` `secondary` `disabled` `inverse` `link` | Copy |
| Brand | `primary.*` `accent.*` (`main` `on` `hover` `pressed`) | Actions / Switch on |
| Status | `success` `warning` `error` `info` | Feedback |
| Chrome | `border` `divider` `focus` `action.*` | Strokes, hover, disabled track |

Light/dark via `LightTheme` / `DarkTheme`. See `docs/MIGRATION-0.2.md` for renames.

## controlMetrics

From `controlMetrics(theme.density, size)` (px):

| Field | small | medium | large |
| --- | --- | --- | --- |
| height / buttonHeight | 22 / 24 | 24 / 36 | 36 / 48 |
| switchTrackW × H | 32 × 18 | 48 × 24 | 60 × 36 |
| switchThumb / inset | 14 / 2 | 18 / 3 | 30 / 3 |
| font | 13 | 14 | 16 |

Icons: `theme.options.constants.iconSizes` → 16 / 24 / 32.

## makeStyles / sx / resolveStyle

```ts
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			BackgroundColor3: theme.palette.surface.paper,
			_hover: { BackgroundColor3: theme.palette.action.hover },
			_disabled: { BackgroundTransparency: 0.5 },
		},
	}),
);

const classes = useStyles();
const painted = resolveStyle(classes.root, { hover, disabled });
// spread painted; className then sx (sx wins)
```

Selector merge order: `_first` → `_last` → `_selected` → `_checked` → `_hover` → `_pressed` → `_focus` → `_disabled` (later wins). Call `resolveStyle` before spreading. Kit components do not auto-resolve `sx` selectors yet.

`componentStyles("Button", factory)` + `theme.components.Button` for overrides. `applyVariants` for prop-driven slots.

## Switch on-state

When `value === true`: track uses `palette.primary.main`, thumb on the **right**. Off: `palette.action.disabled`, thumb left. Label text is independent of `value` — do not use the label to imply state.

## Checks

`pnpm test` includes `density.check.mjs` (8px / type / icons) and `styles.check.mjs` (key components reference spacing/radius/typography tokens; Switch on uses primary).
