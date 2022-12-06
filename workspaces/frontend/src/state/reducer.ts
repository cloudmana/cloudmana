/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { combineReducers } from '@reduxjs/toolkit'
import application from './application/reducer'
import menu from './menu/reducer'
import { authSlice } from './auth'

const reducer = combineReducers({
  application,
  menu,
  auth: authSlice.reducer,
})
export type RootState = ReturnType<typeof reducer>
export default reducer
