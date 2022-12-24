/**
 * @since 2022/12/05
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

// assets
import {
  ChromeOutlined,
  QuestionOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  CalculatorOutlined,
} from '@ant-design/icons'

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'util-utilities',
      title: 'Utilities',
      type: 'collapse',
      icon: CalculatorOutlined,
      children: [
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/typography',
          icon: FontSizeOutlined,
        },
        {
          id: 'util-color',
          title: 'Color',
          type: 'item',
          url: '/color',
          icon: BgColorsOutlined,
        },
        {
          id: 'util-shadow',
          title: 'Shadow',
          type: 'item',
          url: '/shadow',
          icon: BarcodeOutlined,
        },
        {
          id: 'ant-icons',
          title: 'Ant Icons',
          type: 'item',
          url: '/icons/ant',
          icon: AntDesignOutlined,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: ChromeOutlined,
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://cloudmana.gitbook.io/',
      icon: QuestionOutlined,
      external: true,
      target: true,
    },
  ],
}

export default support
