# MUI CSS Variables Reference

When `cssVariables: true` is enabled in your MUI theme, you can use these CSS variables in your CSS modules to respect light/dark mode theming.

## Common CSS Variables

### Background Colors

```css
background-color: var(--mui-palette-background-default); /* Main background */
background-color: var(
  --mui-palette-background-paper
); /* Card/paper background */
```

### Text Colors

```css
color: var(--mui-palette-text-primary); /* Primary text */
color: var(--mui-palette-text-secondary); /* Secondary text */
color: var(--mui-palette-text-disabled); /* Disabled text */
```

### Palette Colors

```css
color: var(--mui-palette-primary-main); /* Primary color */
color: var(--mui-palette-primary-light); /* Primary light */
color: var(--mui-palette-primary-dark); /* Primary dark */
color: var(--mui-palette-secondary-main); /* Secondary color */
color: var(--mui-palette-error-main); /* Error color */
color: var(--mui-palette-warning-main); /* Warning color */
color: var(--mui-palette-info-main); /* Info color */
color: var(--mui-palette-success-main); /* Success color */
```

### Borders & Dividers

```css
border-color: var(--mui-palette-divider); /* Divider/border color */
border: 1px solid var(--mui-palette-divider);
```

## Example Usage in CSS Modules

```css
/* Before - hardcoded colors */
.myComponent {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid #e0e0e0;
}

/* After - theme-aware colors */
.myComponent {
  background-color: var(--mui-palette-background-paper);
  color: var(--mui-palette-text-primary);
  border: 1px solid var(--mui-palette-divider);
}
```

## Complete Variable Naming Pattern

MUI CSS variables follow this pattern:

- `--mui-palette-{color}-{variant}`
- `--mui-palette-{color}-{variant}-{shade}`

Examples:

- `--mui-palette-primary-main`
- `--mui-palette-primary-light`
- `--mui-palette-primary-dark`
- `--mui-palette-background-default`
- `--mui-palette-background-paper`
- `--mui-palette-text-primary`
- `--mui-palette-text-secondary`
- `--mui-palette-divider`

## Notes

- These variables automatically update when the theme mode changes (light/dark)
- You can use them anywhere in CSS modules, regular CSS, or inline styles
- Always provide a fallback if needed: `var(--mui-palette-primary-main, #1976d2)`
