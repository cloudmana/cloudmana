/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createReducer } from '@reduxjs/toolkit'
import { ThemeType } from 'src/models/theme'
import { setTheme } from './actions'

export interface SettingsState {
  theme: string
}

const initialState: SettingsState = {
  theme: ThemeType.LIGHT,
}

export default createReducer(initialState, (builder) =>
  builder.addCase(setTheme, (state, action) => {
    state.theme = action.payload
  }),
)
