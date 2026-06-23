/**
 * VoltusWave UMS — Design Token Reference
 * Single source of truth for chart colors and brand values.
 */

export const BRAND = {
  navy:   '#1F3864',
  orange: '#C55A11',
  teal:   '#2E8B8B',
} as const

export const NAVY = {
  900: '#14223D',
  700: '#1F3864',
  500: '#34507F',
  300: '#6B83AD',
  100: '#D8E0EE',
  50:  '#EEF2F8',
} as const

export const TEAL = {
  700: '#246B6B',
  500: '#2E8B8B',
  300: '#7FBDBD',
  50:  '#E7F2F2',
} as const

export const ORANGE = {
  700: '#9E4810',
  500: '#C55A11',
  300: '#E59B6A',
  50:  '#FBEEE4',
} as const

export const INK = {
  900: '#0F1722',
  700: '#2B3645',
  500: '#5A6675',
  300: '#9AA6B4',
} as const

export const SURFACE = {
  line:          '#E4E8EF',
  surface:       '#FFFFFF',
  canvas:        '#F6F8FB',
  canvasSunken:  '#EEF2F7',
} as const

export const SEMANTIC = {
  success: '#2E8B8B',
  warning: '#C55A11',
  danger:  '#C0392B',
  info:    '#2F6FB0',
} as const

/** Categorical dataviz palette — 8 hues, CVD-safe ordering */
export const VIZ_ARRAY = [
  '#1F3864',
  '#2E8B8B',
  '#C55A11',
  '#5B8DEF',
  '#8E6FB8',
  '#C99A2E',
  '#4A9B7F',
  '#B2566B',
] as const

export const VIZ = Object.assign([...VIZ_ARRAY], {
  navy:   '#1F3864',
  teal:   '#2E8B8B',
  orange: '#C55A11',
  blue:   '#5B8DEF',
  purple: '#8E6FB8',
  gold:   '#C99A2E',
  green:  '#4A9B7F',
  coral:  '#B2566B',
}) as readonly string[] & {
  readonly navy: '#1F3864'
  readonly teal: '#2E8B8B'
  readonly orange: '#C55A11'
  readonly blue: '#5B8DEF'
  readonly purple: '#8E6FB8'
  readonly gold: '#C99A2E'
  readonly green: '#4A9B7F'
  readonly coral: '#B2566B'
}

/** Sequential: navy-50 → navy-700 */
export const SEQ_STOPS = [NAVY[50], NAVY[100], NAVY[300], NAVY[500], NAVY[700]] as const

/** Diverging: under↔target↔over */
export const DIV_STOPS = {
  low:  SEMANTIC.danger,
  mid:  SURFACE.line,
  high: TEAL[500],
} as const
