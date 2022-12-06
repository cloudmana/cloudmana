/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// project import
import Navigation from './Navigation'
import SimpleBar from 'src/components/third-party/SimpleBar'
import NavCard from './NavCard'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
      },
    }}
  >
    <Navigation />
    <NavCard />
  </SimpleBar>
)

export default DrawerContent
