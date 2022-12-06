/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons'

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
}

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const analytics = {
  id: 'analytics',
  title: 'Analytics',
  type: 'group',
  children: [
    {
      id: 'analytics-overview',
      title: 'Overview',
      type: 'item',
      url: '/typography',
      icon: icons.LoginOutlined,
    },
    {
      id: 'analytics-security',
      title: 'Security',
      type: 'item',
      url: '/shadow',
      icon: icons.ProfileOutlined,
    },
  ],
}

export default analytics
