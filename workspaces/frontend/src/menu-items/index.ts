// project import
import migration from './migration'
import pages from './pages'
import dashboard from './dashboard'
import utilities from './utilities'
import support from './support'
import cloudwatch from './cloudwatch'
import analytics from './analytics'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, migration, pages, utilities, cloudwatch, analytics, support],
}

export default menuItems
