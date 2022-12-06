/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import Link from 'next/link'
// material-ui
import { ButtonBase } from '@mui/material'
// project import
import Logo from './Logo'
import config from 'src/config'

// ==============================|| MAIN LOGO ||============================== //

export interface LogoSectionProps {
  sx?: any
  to?: string
}

const LogoSection = ({ sx, to }: LogoSectionProps) => (
  <ButtonBase disableRipple component={Link} href={!to ? config.defaultPath : to} sx={sx}>
    <Logo />
  </ButtonBase>
)

export default LogoSection
