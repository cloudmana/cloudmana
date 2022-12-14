/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import PropTypes from 'prop-types'

// material-ui
import { Box } from '@mui/material'

// project import
import MainCard from 'src/components/MainCard'
import { ThemeType } from 'src/models/theme'

// ==============================|| AUTHENTICATION - CARD WRAPPER ||============================== //

const AuthCard = ({ children, ...other }: any) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%',
      },
    }}
    content={false}
    {...other}
    border={false}
    boxShadow
    shadow={(theme: any) =>
      theme.palette.mode === ThemeType.LIGHT ? theme.customShadows.z1 : undefined
    }
  >
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
  </MainCard>
)

AuthCard.propTypes = {
  children: PropTypes.node,
}

export default AuthCard
