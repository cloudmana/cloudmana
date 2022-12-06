/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Theme as _Theme, ThemeOptions as _ThemeOptions } from '@mui/material/styles'
import { Palette, PaletteOptions } from '@mui/material/styles/createPalette'
import { PaletteColorExtendProps, PaletteColorOptionsExtendProps } from 'themes/theme'

declare module '@mui/material/styles' {
  interface Theme extends _Theme {
    status: {
      danger: string
    }
    customShadows: {
      button: string
      text: string
      z1: string
    }
    palette: Palette & {
      primary: PaletteColorExtendProps
      secondary: PaletteColorExtendProps
      error: PaletteColorExtendProps
      warning: PaletteColorExtendProps
      info: PaletteColorExtendProps
      success: PaletteColorExtendProps
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends _ThemeOptions {
    status?: {
      danger?: string
    }
    customShadows?: {
      button?: string
      text?: string
      z1?: string
    }
    palette: PaletteOptions & {
      primary: PaletteColorOptionsExtendProps
      secondary: PaletteColorOptionsExtendProps
      error: PaletteColorOptionsExtendProps
      warning: PaletteColorOptionsExtendProps
      info: PaletteColorOptionsExtendProps
      success: PaletteColorOptionsExtendProps
    }
  }
}
