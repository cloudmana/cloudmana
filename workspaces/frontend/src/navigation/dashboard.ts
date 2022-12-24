/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { DashboardOutlined, HomeOutlined } from '@ant-design/icons'

// icons
const icons = {
  DashboardOutlined,
  HomeOutlined,
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'welcome',
      title: 'Welcome',
      type: 'item',
      url: '/welcome',
      icon: icons.HomeOutlined,
      breadcrumbs: false,
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
