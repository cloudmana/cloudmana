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
import LogoSmall from './LogoSmall'
import config from 'src/config'

// ==============================|| MAIN LOGO ||============================== //

export interface LogoSectionProps {
  src?: string
  size?: 'normal' | 'small'
  sx?: any
  to?: string
}

const LogoSection = ({ src, size = 'normal', sx, to }: LogoSectionProps) => (
  <ButtonBase disableRipple component={Link} href={!to ? config.defaultPath : to} sx={sx}>
    {size === 'normal' ? <Logo src={src} /> : <LogoSmall />}
  </ButtonBase>
)

export default LogoSection
