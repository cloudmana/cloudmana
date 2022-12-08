/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { lazy } from 'react'
import Loadable from 'src/components/Loadable'

const Welcome = Loadable(lazy(() => import('src/modules/welcome')))

export default Welcome
