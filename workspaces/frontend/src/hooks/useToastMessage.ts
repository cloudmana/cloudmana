/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { VariantType, useSnackbar, SnackbarKey } from 'notistack'

export type StatusType = VariantType

export enum ToastTypes {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

export type MessageType = {
  title: string
  description: string
  status: string
  position: string
}

export function useToastMessage(): [((status: StatusType, message: string) => SnackbarKey)] {
  const { enqueueSnackbar } = useSnackbar()

  const showNotify = (status: StatusType, message: string) =>
    enqueueSnackbar(message, {
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
    enqueueSnackbar(authState[status]?.description, { variant: status as StatusType })
  return { showMessage }
}
