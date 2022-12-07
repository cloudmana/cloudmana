/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { VariantType, useSnackbar } from 'notistack'

export type StatusType = 'success' | 'error'

export type MessageType = {
  title: string
  description: string
  status: string
  position: string
}

export function useToastMessage() {
  const { enqueueSnackbar } = useSnackbar()
  const notify: any = {
    ['success']: {
      title: 'Success',
      description: 'Transaction has been performed successfully!',
      status: 'success',
      position: 'top-right',
      className: 'max-w-[320px] sm:max-w-[380px]',
    },
  }

  const showNotify = (status: VariantType) =>
    enqueueSnackbar(notify[status].description, {
      variant: status,
      anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
    })

  return [showNotify]
}

export const authState: Partial<Record<StatusType, MessageType>> = {
  success: {
    title: 'Success',
    description: 'Connected to wallet successfully!',
    status: 'success',
    position: 'top-right',
  },
  error: {
    title: 'Error',
    description: 'Failed to connect to wallet!',
    status: 'error',
    position: 'top-right',
  },
}

export function useAuthToastMessage() {
  const { enqueueSnackbar } = useSnackbar()
  const showMessage = (status: StatusType) =>
    enqueueSnackbar(authState[status]?.description, { variant: status as VariantType })
  return { showMessage }
}
