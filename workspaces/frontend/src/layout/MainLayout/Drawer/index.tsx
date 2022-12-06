/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useMemo } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'

// project import
import DrawerHeader from './DrawerHeader'
import DrawerContent from './DrawerContent'
import MiniDrawerStyled from './MiniDrawerStyled'
import { drawerWidth } from 'src/config'

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

export interface MainDrawerProps {
  open: boolean
  handleDrawerToggle: any
  window?: any
}

const MainDrawer = ({ open, handleDrawerToggle, window }: MainDrawerProps) => {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, [])
  const drawerHeader = useMemo(() => <DrawerHeader open={open} />, [open])

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }} aria-label="mailbox folders">
      {!matchDownMD ? (
        <MiniDrawerStyled variant="permanent" open={open}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          {open && drawerHeader}
          {open && drawerContent}
        </Drawer>
      )}
    </Box>
  )
}

export default MainDrawer
