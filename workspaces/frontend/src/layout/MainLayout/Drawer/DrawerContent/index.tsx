// project import
import Navigation from './Navigation'
import SimpleBar from 'components/third-party/SimpleBar'
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
