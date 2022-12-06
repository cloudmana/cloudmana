/**
 * @since 2022/11/10
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

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/auth/login',
      icon: icons.LoginOutlined,
      target: true,
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/auth/register',
      icon: icons.ProfileOutlined,
      target: true,
    },
  ],
}

export default pages
