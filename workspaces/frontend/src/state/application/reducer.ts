/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createReducer, nanoid } from '@reduxjs/toolkit'
import { ThemeType } from 'src/models/theme'
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setOpenModal,
  setTheme,
  updateStep,
  setPendingSwitchAcc,
  setErrorApp,
  setTimeFilter,
} from './actions'

type PopupList = Array<{
  key: string
  show: boolean
  content: PopupContent
  removeAfterMs: number | null
}>

export interface ErrorType {
  message?: string
  code?: number
}
export interface ApplicationState {
  theme: string
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
  step: string
  pendingSwitchAcc: boolean
  error?: ErrorType
  timeFilterData: string
}

const initialState: ApplicationState = {
  theme: ThemeType.LIGHT,
  popupList: [],
  openModal: null,
  step: '0',
  timeFilterData: '1d',
  pendingSwitchAcc: false,
  error: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setTheme, (state, action) => {
      state.theme = action.payload
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
    .addCase(addPopup, (state, { payload: { content, key, removeAfterMs = 15000 } }) => {
      state.popupList = (
        key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ])
    })
    .addCase(removePopup, (state, { payload: { key } }) => {
      state.popupList.forEach((p) => {
        if (p.key === key) {
          p.show = false
        }
      })
    })
    .addCase(updateStep, (state, action) => {
      state.step = action.payload
    })
    .addCase(setPendingSwitchAcc, (state, action) => {
      state.pendingSwitchAcc = action.payload
    })
    .addCase(setErrorApp, (state, action) => {
      state.error = action.payload
    })
    .addCase(setTimeFilter, (state, action) => {
      state.timeFilterData = action.payload
    }),
)
