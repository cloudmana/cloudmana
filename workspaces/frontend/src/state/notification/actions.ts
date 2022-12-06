/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createAction } from '@reduxjs/toolkit'

export const updateNotification = createAction<{
  items: any[]
}>('notification/updateNotification')

export const updateCountNumber = createAction<{
  item: {
    count: number
    countAll: number
  }
}>('notification/updateCountNumber')
