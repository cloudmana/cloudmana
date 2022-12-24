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
import { useSelector } from 'react-redux'

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const drawerOpen = useSelector((state: any) => state.menu.drawerOpen)

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Navigation />
      {drawerOpen && <NavCard />}
    </SimpleBar>
  )
}
export default DrawerContent
