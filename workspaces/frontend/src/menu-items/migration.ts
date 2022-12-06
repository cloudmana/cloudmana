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

const migration = {
  id: 'migration',
  title: 'Migration',
  type: 'group',
  children: [
    {
      id: 'migrate-to-other-account',
      title: 'Account',
      type: 'item',
      url: '/typography', //'/migrate/other-account',
      icon: icons.LoginOutlined,
    },
    {
      id: 'migrate-to-other-cloud-provider',
      title: 'Cloud Provider',
      type: 'item',
      url: '/shadow', //'/migrate/other-cloud-provider',
      icon: icons.ProfileOutlined,
    },
  ],
}

export default migration
