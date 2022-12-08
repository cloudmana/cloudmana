/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'

// project import
import { drawerWidth } from 'src/config'
import { ThemeType } from 'src/models/theme'

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  borderRight: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  boxShadow: 'none',
})

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 60,
  borderRight: 'none',
  boxShadow: theme.palette.mode === ThemeType.LIGHT ? theme.customShadows.z1 : undefined,
})

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) =>
    ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    } as any),
)

export default MiniDrawerStyled
