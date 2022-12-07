/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { clientApi } from 'src/utils/api'
import {
  ListNotificationFilter,
  ListNotificationResponse,
  IReadNotification,
} from './api-notification.type'

export const getListNotification = (
  filter: ListNotificationFilter,
): Promise<ListNotificationResponse> => {
  return clientApi
    .get<ListNotificationResponse>(
      `/api/v1/cloudmana/notifications?&sortBy=${filter.sortBy}&sortType=${filter.sortType}&page=${filter.page}&size=${filter.size}`,
    )
    .then((res) => {
      if (res.data) {
        return res.data
      }
      return {} as ListNotificationResponse
    })
}
export const getCountNumberNotification = (): Promise<any> => {
  return clientApi.get<any>('/api/v1/cloudmana/notifications/count').then((res) => {
    if (res.data) {
      return res.data
    }
    return {} as any
  })
}

export const readItemNotification = (id: string): Promise<IReadNotification> => {
  return clientApi.post(`/api/v1/cloudmana/notifications/read/${id}`).then((res) => {
    if (res.data) {
      return res.data as IReadNotification
    }
    return {} as IReadNotification
  })
}

export const readAllNotification = (): Promise<any> => {
  return clientApi.post('/api/v1/cloudmana/notifications/read-all').then((res) => {
    if (res.data) {
      return res.data as any
    }
    return {} as any
  })
}
