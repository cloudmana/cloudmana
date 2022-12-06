/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// material-ui
// import { useTheme } from '@mui/material/styles'
import Image from 'src/components/Image'
import logo from 'src/assets/images/logo.svg'

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme()

  return <Image src={logo} alt="Mantis" width="150" height="50" />
}

export default Logo
