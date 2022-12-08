/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { LoginOutlined, ProfileOutlined, UserSwitchOutlined, CloudSyncOutlined } from '@ant-design/icons'

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UserSwitchOutlined,
  CloudSyncOutlined,
}

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const migration = {
  id: 'migration',
  title: 'Migration',
  type: 'group',
  children: [
    {
      id: 'migrate-to-other-account',
      title: 'Accounts',
      type: 'item',
      url: '/typography', //'/migrate/other-account',
      icon: icons.UserSwitchOutlined,
    },
    {
      id: 'migrate-to-other-cloud-provider',
      title: 'Providers',
      type: 'item',
      url: '/shadow', //'/migrate/other-cloud-provider',
      icon: icons.CloudSyncOutlined,
    },
  ],
}

export default migration
