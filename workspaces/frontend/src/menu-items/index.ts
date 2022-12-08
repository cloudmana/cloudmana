/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// project import
import migration from './migration'
import dashboard from './dashboard'
import utilities from './utilities'
import support from './support'
import analytics from './analytics'
import services from './services'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, services, utilities, migration, analytics, support],
}

export default menuItems
