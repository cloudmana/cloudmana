/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

// ==============================|| DRAWER HEADER - STYLED ||============================== //

export interface DrawerHeaderStyledProps {
  open: boolean
}

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<DrawerHeaderStyledProps>(
  ({ theme, open }: any) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-start' : 'center',
    paddingLeft: theme.spacing(open ? 3 : 0),
  }),
)

export default DrawerHeaderStyled
