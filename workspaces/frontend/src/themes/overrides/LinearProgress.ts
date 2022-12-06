/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// ==============================|| OVERRIDES - LINER PROGRESS ||============================== //

export default function LinearProgress() {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 100,
        },
        bar: {
          borderRadius: 100,
        },
      },
    },
  }
}
