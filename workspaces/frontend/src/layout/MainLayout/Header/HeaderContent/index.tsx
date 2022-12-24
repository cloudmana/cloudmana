/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useDispatch, useSelector } from 'react-redux'

// material-ui
import { Box, FormControlLabel, IconButton, Link, useMediaQuery } from '@mui/material'
import { GithubOutlined } from '@ant-design/icons'

// project import
import Search from './Search'
import Profile from './Profile'
import Notification from './Notification'
import MobileSection from './MobileSection'
import { MaterialUISwitch } from 'src/components/Switch'
import { setTheme } from 'src/state/settings/actions'
import { ThemeType } from 'src/models/theme'
import { RootState } from 'src/state/reducer'

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const theme = useSelector((state: RootState) => state.settings.theme)
  const dispatch = useDispatch()
  const matchesXs = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const handleToggleTheme = () => {
    dispatch(setTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK))
  }

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <FormControlLabel
        control={
          <MaterialUISwitch sx={{ m: 1 }} checked={theme === ThemeType.DARK} onChange={handleToggleTheme} />
        }
        label=""
      />

      <IconButton
        component={Link}
        href="https://github.com/cloudmana/cloudmana"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      >
        <GithubOutlined />
      </IconButton>

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  )
}

export default HeaderContent
