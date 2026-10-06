# Uiblox styling

Theme tokens + style helpers for Roblox Instance props. No CSS string parser.

## Web → Roblox support

| Web / MUI | Uiblox | Status |
| --- | --- | --- |
| `makeStyles` / `createStyles` | `makeStyles` / `createStyles` | yes — slot maps, theme-aware |
| `sx` prop (CSS + tokens) | `sx` on `SxHost` (Box, Paper, Stack, FlexItem, Grid, Container, …) | yes — shorthands resolve on the host; raw Instance keys still pass through |
| `className` + `cx` | `className` / `cx` — last spread wins | yes — use `cx(className, resolveSx(…).root)` then `…sx` if raw |
| `:hover` / `:active` / `:focus` | `_hover` / `_pressed` / `_focus` via `resolveStyle` | yes |
| `:focus-visible` | `_focusVisible` + `focusVisible` state | yes — author sets flag (Selection + keyboard) |
| `:disabled` / `[aria-selected]` / `:checked` | `_disabled` / `_selected` / `_checked` | yes |
| loading / nth odd-even / first-last | `_loading` / `_odd` / `_even` / `_first` / `_last` | yes |
| `variants` / `compoundVariants` | `applyVariants` + `theme.components.*.variants` | yes — overrides win last |
| `theme.components` defaultProps / styleOverrides | `componentStyles` + `theme.components` | yes |
| `@media` breakpoints | `resolveResponsive` / sx `{ phone, tablet, desktop }` + `useBreakpoints` | yes — one `observeViewport` per host |
| spacing scale | `theme.spacing.calc(n)` (8px) | yes |
| density | `theme.density` + `controlMetrics` | yes |
| CSS flex/grid solver | native `Stack` / `FlexItem` / `Grid` (UIList/UIGrid/UIFlexItem) | yes — no flexbox solver |
| nested `&:hover .child` / `::before` | — | no — pass parent state; use children |
| CSS `transition` sugar | `playProperty` / `reducedMotion` | partial |

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

## Recipes

### sx shorthands

```ts
const { root, padding, corner, gap } = resolveSx(theme, {
	width: { phone: 120, desktop: 240 },
	p: 2,
	px: 3,
	bgcolor: "surface.paper",
	color: "text.primary",
	radius: theme.shape.borderRadius,
	gap: 1,
	typography: "body",
	_hover: { bgcolor: "action.hover" },
}, width);

const painted = resolveStyle(root, { hover });
// <frame {...painted}>; <uipadding {...padding}/>; <uicorner {...corner}/>;
// list layout Padding = new UDim(0, gap)
```

Shorthands: `width`/`height`/`w`/`h`/`size`, `x`/`y`/`position`/`anchor`, `p`/`px`/`py`/`pt`…/`padding`, `gap`, `bgcolor`/`bg`/`color`/`borderColor` (palette tokens or `Color3`), `opacity`/`transparency`, `border`, `radius`, `typography`/`fontSize`/`font`, `visible`/`zIndex`. Native Instance keys pass through (and win over colliding shorthands).

### Selectors + precedence

```ts
const painted = resolveStyle(classes.root, { hover, pressed, focusVisible, disabled, first, odd });
```

Order (later wins): `_first` → `_last` → `_odd` → `_even` → `_selected` → `_checked` → `_loading` → `_hover` → `_pressed` → `_focus` → `_focusVisible` → `_disabled`.

Compose: `className` then `sx` (sx wins), then explicit host props. `SxHost` tracks hover, press, and focus and runs `resolveStyle` unless `state` overrides a flag. `_disabled` follows `state.disabled`. An existing `UIPadding`, `UICorner`, or layout `Padding` / `CellPadding` child wins over sx `p` / `radius` / `gap`.

```tsx
<Box sx={{ p: 2, bgcolor: "surface.paper", radius: 4 }} />
<Button text="Save" sx={{ bgcolor: "primary.main", _hover: { bgcolor: "primary.hover" } }} />
<IconButton icon={Icons.Close} sx={{ p: 1 }} />
<Input placeholder="Name" sx={{ bgcolor: "surface.input", _focus: { borderColor: "primary.main" } }} />
<Typography text="Title" sx={{ color: "text.primary", typography: "h6" }} />
<Slider value={0.4} min={0} max={1} onChange={() => {}} sx={{ width: { phone: 160, desktop: 280 } }} />
<Alert message="Saved" sx={{ bgcolor: "success.main" }} />
<AppBar title="Library" sx={{ bgcolor: "surface.paper" }} />
<Stack direction="row" sx={{ gap: 2, width: { phone: 160, desktop: 320 } }}>
	<textlabel Text="A" />
</Stack>
```

`resolveSx` remains for callers that paint their own host. Responsive `sx` maps follow the host width after mount (`phone` < 600 ≤ `tablet` < 960 ≤ `desktop`).

### Theme component overrides

```ts
const theme = {
	...LightTheme,
	components: {
		Button: {
			defaultProps: { size: "small" },
			variants: { color: { primary: { root: { BackgroundTransparency: 0 } } } },
			compoundVariants: [{ when: { size: "small", color: "primary" }, styles: { root: { TextSize: 12 } } }],
			styleOverrides: { root: { BorderSizePixel: 0 } },
		},
	},
};
```

Factory → theme variants/compound → `styleOverrides` (overrides win).

### Breakpoints

`phone` < 600 ≤ `tablet` < 960 ≤ `desktop`. `observeViewport(host, cb)` shares one AbsoluteSize connection (not a per-frame poll). `useBreakpoints(host)` subscribes to that observer. `clearStyleCaches()` / `clearViewportObservers()` for tests / hot reload.

## controlMetrics

From `controlMetrics(theme.density, size)` (px):

| Field | small | medium | large |
| --- | --- | --- | --- |
| height / buttonHeight | 22 / 24 | 24 / 36 | 36 / 48 |
| switchTrackW × H | 32 × 18 | 48 × 24 | 60 × 36 |
| switchThumb / inset | 14 / 2 | 18 / 3 | 30 / 3 |
| font | 13 | 14 | 16 |

Icons: `theme.options.constants.iconSizes` → 16 / 24 / 32.

## Switch on-state

When `value === true`: track uses `palette.primary.main`, thumb on the **right**. Off: `palette.action.disabled`, thumb left. Label text is independent of `value` — do not use the label to imply state.

## Checks

`pnpm test` includes `density.check.mjs`, `styles.check.mjs`, `resolve-style.check.mjs`, `resolve-sx.check.mjs`, `style-cache.check.mjs`, `viewport-observer.check.mjs`.
