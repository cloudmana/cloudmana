/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createAction } from '@reduxjs/toolkit'

export const activeItem = createAction<string[]>('menu/activeItem')
export const activeComponent = createAction<string>('menu/activeComponent')
export const openDrawer = createAction<boolean>('menu/openDrawer')
export const openComponentDrawer = createAction<boolean>('menu/openComponentDrawer')
