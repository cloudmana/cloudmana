/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { CloudServerOutlined, AppstoreOutlined } from '@ant-design/icons'

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const services = {
  id: 'services',
  title: 'Cloud',
  type: 'group',
  children: [
    {
      id: 'service-list',
      title: 'Services',
      type: 'collapse',
      url: '',
      icon: CloudServerOutlined,
      children: [
        {
          id: 'services-list',
          title: 'List',
          type: 'item',
          url: '/services',
          icon: AppstoreOutlined,
        },
      ],
    },
  ],
}

export default services
