/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useState } from 'react'
import { useQueryAPI } from 'src/hooks/useQueryAPI'
import {
  getCountNumberNotification,
  getListNotification,
} from 'src/services/api-notification.service'
import { ListNotificationFilter } from 'src/services/api-notification.type'
import { useAppDispatch } from '../hooks'
import { updateCountNumber, updateNotification } from './actions'

export function useUpdateNotification(filter?: ListNotificationFilter) {
  const defaultNotificationFilter: ListNotificationFilter = {
    sortBy: 'createdAt',
    sortType: 'desc',
    page: 1,
    size: 10,
  }
  const dispatch = useAppDispatch()
  const onSuccessGetListNotification = (data: any) => {
    dispatch(updateNotification({ items: data.items }))
  }
  const [_filterNotification, _setFilterNotification] =
    useState<ListNotificationFilter>(defaultNotificationFilter)

  const onSuccessGetCountNotification = (data: any) => {
    dispatch(updateCountNumber({ item: data }))
  }

  const {
    dataApi: _listNotification,
    isSuccess: _dataListNotiSuccess,
    callApi: callApiGetListNoti,
  } = useQueryAPI(
    () => getListNotification(filter || defaultNotificationFilter),
    onSuccessGetListNotification,
  )

  const {
    dataApi: _countNotification,
    isSuccess: _dataCountNotiSuccess,
    callApi: callApiGetCountNoti,
  } = useQueryAPI(() => getCountNumberNotification(), onSuccessGetCountNotification)

  return () => {
    callApiGetListNoti()
    callApiGetCountNoti()
  }
}
