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

const cloudwatch = {
  id: 'cloudwatch',
  title: 'Cloudwatch',
  type: 'group',
  children: [
    {
      id: 'cloudwatch-overview',
      title: 'Overview',
      type: 'collapse',
      url: '',
      icon: icons.LoginOutlined,
      children: [
        {
          id: 'cloudwatch-overview-1',
          title: 'Overview 2',
          type: 'item',
          url: '/shadow',
          icon: icons.LoginOutlined,
        },
      ],
    },
    {
      id: 'cloudwatch-security',
      title: 'Security',
      type: 'item',
      url: '/shadow',
      icon: icons.ProfileOutlined,
    },
  ],
}

export default cloudwatch
