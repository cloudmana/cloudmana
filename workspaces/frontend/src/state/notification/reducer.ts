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
      // const tempData = data || notification.data
      // const tempLastBlockTimeRead = lastBlockTimeRead || notification.lastBlockTimeRead
      // notification.total = tempData.filter((o: NftOrderHistory) => o.createdTime > tempLastBlockTimeRead).length
      state.notifications = [...items]
    })
    .addCase(updateCountNumber, (state, { payload: { item = {} } }) => {
      const { count, countAll } = item
      // const tempData = data || notification.data
      // const tempLastBlockTimeRead = lastBlockTimeRead || notification.lastBlockTimeRead
      // notification.total = tempData.filter((o: NftOrderHistory) => o.createdTime > tempLastBlockTimeRead).length
      state.count = count
      state.countAll = countAll
    }),
)
