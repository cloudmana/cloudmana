import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@mui/material'

// project import
import Logo from './Logo'
import config from 'config'

// ==============================|| MAIN LOGO ||============================== //

export interface LogoSectionProps {
  sx?: any
  to?: string
}

const LogoSection = ({ sx, to }: LogoSectionProps) => (
  <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
    <Logo />
  </ButtonBase>
)

export default LogoSection
