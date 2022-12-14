/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Toolbar, useMediaQuery } from '@mui/material'

// project import
import Drawer from './Drawer'
import Header from './Header'
import navigation from 'src/navigation'
import Breadcrumbs from 'src/components/@extended/Breadcrumbs'

// types
import { openDrawer } from 'src/state/menu/actions'
import { RootState } from 'src/state/reducer'
import { useAutoFetchCurrentUser } from 'src/state/auth/hooks'

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const theme = useTheme()
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'))
  const dispatch = useDispatch()
  const router = useRouter()
  useAutoFetchCurrentUser()

  const { drawerOpen } = useSelector((state: RootState) => state.menu)
  const { token } = useSelector((state: RootState) => state.auth)

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen)
  const handleDrawerToggle = () => {
    setOpen(!open)
    dispatch(openDrawer(!open))
  }

  useEffect(() => {
    if (!token) {
      router.replace('/auth/login')
    }
  }, [token])

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG)
    dispatch(openDrawer(!matchDownLG))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG])

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen])

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title />
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
