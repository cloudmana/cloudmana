/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { BlockOutlined } from '@ant-design/icons'

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-template',
      title: 'Templates',
      type: 'item',
      url: '/typography',
      icon: BlockOutlined,
    },
  ],
}

export default utilities
