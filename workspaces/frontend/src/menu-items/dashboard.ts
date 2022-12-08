/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { DashboardOutlined } from '@ant-design/icons'

// icons
const icons = {
  DashboardOutlined,
}

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'dashboard-template',
      title: 'Template',
      type: 'item',
      url: '/dashboard/template',
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
