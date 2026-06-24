/**
 * VoltusWave UMS — Design Token Reference
 * Single source of truth for chart colors and brand values.
 */

export const BRAND = {
  navy:   '#183A63',
  orange: '#B66A1F',
  teal:   '#15847E',
} as const

export const NAVY = {
  900: '#0B1B33',
  700: '#183A63',
  500: '#2D5E91',
  300: '#6E91B8',
  100: '#D7E3F0',
  50:  '#F0F5FA',
} as const

export const TEAL = {
  700: '#0D5E5A',
  500: '#15847E',
  300: '#64BDB6',
  50:  '#E6F6F4',
} as const

export const ORANGE = {
  700: '#884411',
  500: '#B66A1F',
  300: '#E0A257',
  50:  '#FFF0DF',
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
  success: '#15847E',
  warning: '#B66A1F',
  danger:  '#B33A4A',
  info:    '#2563A7',
} as const

/** Categorical dataviz palette — 8 hues, CVD-safe ordering */
export const VIZ_ARRAY = [
  '#183A63',
  '#15847E',
  '#B66A1F',
  '#2563A7',
  '#7C4D9E',
  '#B9911E',
  '#23835F',
  '#B33A4A',
] as const

export const VIZ = Object.assign([...VIZ_ARRAY], {
  navy:   '#183A63',
  teal:   '#15847E',
  orange: '#B66A1F',
  blue:   '#2563A7',
  purple: '#7C4D9E',
  gold:   '#B9911E',
  green:  '#23835F',
  coral:  '#B33A4A',
}) as readonly string[] & {
  readonly navy: '#183A63'
  readonly teal: '#15847E'
  readonly orange: '#B66A1F'
  readonly blue: '#2563A7'
  readonly purple: '#7C4D9E'
  readonly gold: '#B9911E'
  readonly green: '#23835F'
  readonly coral: '#B33A4A'
}

/** Sequential: navy-50 → navy-700 */
export const SEQ_STOPS = [NAVY[50], NAVY[100], NAVY[300], NAVY[500], NAVY[700]] as const

/** Diverging: under↔target↔over */
export const DIV_STOPS = {
  low:  SEMANTIC.danger,
  mid:  SURFACE.line,
  high: TEAL[500],
} as const
