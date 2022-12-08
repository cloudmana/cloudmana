/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import { AreaChartOutlined, SecurityScanOutlined } from '@ant-design/icons'

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const analytics = {
  id: 'analytics',
  title: 'Analytics',
  type: 'group',
  children: [
    {
      id: 'cloudwatch-overview',
      title: 'Overview',
      type: 'item',
      icon: AreaChartOutlined,
    },
    {
      id: 'analytics-security',
      title: 'Security',
      type: 'item',
      url: '/shadow',
      icon: SecurityScanOutlined,
    },
  ],
}

export default analytics
