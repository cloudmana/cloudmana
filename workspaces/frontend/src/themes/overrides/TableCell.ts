/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme: any) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          padding: 12,
          borderColor: theme.palette.divider,
        },
        head: {
          fontWeight: 600,
          paddingTop: 20,
          paddingBottom: 20,
        },
      },
    },
  }
}
