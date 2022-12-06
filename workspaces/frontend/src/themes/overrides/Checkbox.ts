/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme: any) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary[300],
        },
      },
    },
  }
}
