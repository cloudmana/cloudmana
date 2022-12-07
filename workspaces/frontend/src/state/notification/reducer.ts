/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createReducer } from '@reduxjs/toolkit'
import { updateNotification, updateCountNumber } from './actions'

export interface NotificationState {
  notifications: any[]
  count: number
  countAll: number
}

export const initialNotificationState: NotificationState = {
  notifications: [],
  count: 0,
  countAll: 0,
}

export default createReducer(initialNotificationState, (builder) =>
  builder
    .addCase(updateNotification, (state, { payload: { items = [] } }) => {
      state.notifications = [...items]
    })
    .addCase(updateCountNumber, (state: any, { payload: { item = {} } }) => {
      const { count, countAll } = item
      state.count = count
      state.countAll = countAll
    }),
)
