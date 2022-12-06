/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useNotification, NotificationProps } from '@vechaiui/notification'

export type StatusType = 'success' | 'failed' | 'rejected' | 'exceededAvailable' | 'fail'

export type MessageType = {
  title: string
  description: string
  status: string
  position: string
}

export function useToastMessage() {
  const notification = useNotification()

  const noti = {
    ['success']: {
      title: 'Success',
      description: 'Transaction has been performed successfully!',
      status: 'success',
      position: 'top-right',
      className: 'max-w-[320px] sm:max-w-[380px]',
    },
    ['rejected']: {
      title: 'Rejected',
      description: 'User rejected transaction!',
      status: 'error',
      position: 'top-right',
      className: 'max-w-[320px] sm:max-w-[380px]',
    },
    ['fail']: {
      title: 'Failed',
      description: 'Transaction has been failed!',
      status: 'error',
      position: 'top-right',
      className: 'max-w-[320px] sm:max-w-[380px] mr-4',
    },
    ['exceededAvailable']: {
      title: 'Exceeded available token amount!',
      description: 'Transaction will be failed!',
      status: 'error',
      position: 'top-right',
      className: 'max-w-[320px] sm:max-w-[380px]',
    },
  }

  const showNoti = (status: string) => notification(noti[status])

  return [showNoti]
}

export const authState: Partial<Record<StatusType, MessageType>> = {
  success: {
    title: 'Success',
    description: 'Connected to wallet successfully!',
    status: 'success',
    position: 'top-right',
  },
  failed: {
    title: 'Failed',
    description: 'Failed to connect to wallet!',
    status: 'error',
    position: 'top-right',
  },
}

export function useAuthToastMessage() {
  const notification = useNotification()
  const showMessage = (status: StatusType) => notification(authState[status] as NotificationProps)
  return { showMessage }
}
