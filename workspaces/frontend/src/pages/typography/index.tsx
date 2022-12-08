/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { lazy } from 'react'
import Loadable from 'src/components/Loadable'

const Typography = Loadable(lazy(() => import('src/modules/components-overview/Typography')))

export default Typography
