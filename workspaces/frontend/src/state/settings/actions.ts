/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createAction } from '@reduxjs/toolkit'

export const setTheme = createAction<string>('settings/setTheme')
