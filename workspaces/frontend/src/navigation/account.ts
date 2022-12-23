/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { BlockOutlined } from '@ant-design/icons'

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const account = {
  id: 'account-group',
  title: 'Account',
  type: 'group',
  children: [
    {
      id: 'account',
      title: 'Account',
      type: 'collapse',
      icon: BlockOutlined,
      children: [
        {
          id: 'account-iam',
          title: 'IAM',
          type: 'item',
          url: '/iam',
          icon: BlockOutlined,
        },
      ],
    },
  ],
}

export default account
