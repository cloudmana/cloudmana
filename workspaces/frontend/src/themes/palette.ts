/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { createTheme } from '@mui/material/styles'

// third-party
import { presetPalettes } from '@ant-design/colors'

// project import
import ThemeOption from './theme'
import { ThemeType } from 'src/models/theme'

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const greyLight = {
  greyPrimary: [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000',
  ],
  greyAscent: ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'],
  greyConstant: ['#fafafb', '#e6ebf1'],
}

const greyDark = {
  greyPrimary: [
    '#1e1e1e',
    '#141414',
    '#121212',
    'rgba(255, 255, 255, 0.05)',
    'rgba(255, 255, 255, 0.23)',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#ffffff',
    '#141414',
    '#ffffff',
  ],
  greyAscent: ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'],
  greyConstant: ['#121212', 'rgb(255 255 255 / 5%)'],
}

const Palette = (mode: any) => {
  const colors = presetPalettes
  const { greyPrimary, greyAscent, greyConstant } = mode === ThemeType.LIGHT ? greyLight : greyDark
  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant]

  const paletteColor = ThemeOption(colors)

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
  })
}

export default Palette
