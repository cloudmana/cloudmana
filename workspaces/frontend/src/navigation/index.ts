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
import account from './account'

// ==============================|| MENU ITEMS ||============================== //

export const menuItems = {
  items: [dashboard, services, utilities, migration, analytics, support],
}

const navigation = {
  items: [...menuItems.items, account],
}

export default navigation
