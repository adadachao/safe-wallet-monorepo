import type { ColorPalette } from './types'

/**
 * Unified dark mode color palette — MOVA brand.
 * Accent: #c1ff72, backgrounds: #000000 / #14170d / #1c1c1c.
 */
const darkPalette: ColorPalette = {
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A3A7',
    disabled: 'rgba(255, 255, 255, 0.3)',
    contrast: '#000000',
  },
  primary: {
    dark: '#9ed14a',
    main: '#c1ff72',
    light: '#d4ff9e',
  },
  secondary: {
    dark: '#636669',
    main: '#FFFFFF',
    light: '#e0ffba',
    background: '#14170d',
  },
  border: {
    main: '#636669',
    light: '#303033',
    background: '#000000',
  },
  error: {
    dark: '#FFE0E6',
    main: '#FF5F72',
    light: '#4A2125',
    background: '#4A2125',
  },
  error1: {
    main: '#4A2125',
    contrastText: '#FFE0E6',
  },
  success: {
    dark: '#DEFDEA',
    main: '#00B460',
    light: '#3B7A54',
    background: '#173026',
  },
  info: {
    dark: '#9ed14a',
    main: '#c1ff72',
    light: '#d4ff9e',
    background: '#14170d',
  },
  warning: {
    dark: '#FFE4CB',
    main: '#FF8C00',
    light: '#A65F34',
    background: '#4A3621',
  },
  warning1: {
    main: '#4A3621',
    text: '#FFE4CB',
    contrastText: '#FF8C00',
  },
  background: {
    default: '#000000',
    main: '#000000',
    sheet: '#000000',
    paper: '#1C1C1C',
    light: '#14170d',
    secondary: '#303033',
    skeleton: 'rgba(255, 255, 255, 0.04)',
    disabled: '#7878801F',
  },
  backdrop: {
    main: '#636669',
  },
  logo: {
    main: '#FFFFFF',
    background: '#1C1C1C',
  },
  static: {
    main: '#000000',
    light: '#636669',
    primary: '#FFFFFF',
    textSecondary: '#A1A3A7',
    textBrand: '#c1ff72',
  },
}

export default darkPalette
