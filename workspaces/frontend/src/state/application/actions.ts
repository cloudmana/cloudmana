/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createAction } from '@reduxjs/toolkit'
import { ErrorType } from './reducer'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        auto: boolean
      }
    }

export enum ApplicationModal {
  SETTINGS,
  MENU,
  DELEGATE,
  LANGUAGE,
}

export enum TimeFilterEnum {
  M5 = '5m',
  M15 = '15m',
  H1 = '1h',
  H4 = '4h',
  D1 = '1d',
  D7 = '7d',
  D30 = '30d',
}

export const updateBlockNumber = createAction<{
  chainId: number
  blockNumber: number
}>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const addPopup = createAction<{
  key?: string
  removeAfterMs?: number | null
  content: PopupContent
}>('application/addPopup')
export const removePopup = createAction<{ key: string }>('application/removePopup')
export const setKashiApprovalPending = createAction<string>('application/setKashiApprovalPending')
export const updateStep = createAction<string>('application/updateStep')
export const setPendingSwitchAcc = createAction<boolean>('application/setPendingSwitchAcc')
export const setErrorApp = createAction<ErrorType>('application/setErrorApp')
export const setTimeFilter = createAction<TimeFilterEnum | null>('application/setTimeFilter')
