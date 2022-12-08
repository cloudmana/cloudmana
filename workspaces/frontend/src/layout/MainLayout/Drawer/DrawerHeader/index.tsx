/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Stack, Chip } from '@mui/material'

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled'
import Logo from 'src/components/Logo'
import env from 'src/config/env'

// ==============================|| DRAWER HEADER ||============================== //

export interface DrawerHeaderProps {
  open: boolean
}

const DrawerHeader = ({ open }: DrawerHeaderProps) => {
  const theme = useTheme()
  const drawerOpen = useSelector((state: any) => state.menu.drawerOpen)

  return (
    // only available in paid version
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Logo size={drawerOpen ? 'normal' : 'small'} />
        {open && (
          <Chip
            label={env.NEXT_APP_VERSION}
            size="small"
            sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
            component="a"
            href="https://github.com/cloudmana/cloudmana"
            target="_blank"
            clickable
          />
        )}
      </Stack>
    </DrawerHeaderStyled>
  )
}

export default DrawerHeader
