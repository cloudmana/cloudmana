/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthStatus, LoggedInAccount, User } from './types'
import { RootState } from '../reducer'
import { IToken } from 'src/models/auth'

const initialState: AuthState = {
  status: AuthStatus.DEACTIVATE,
  token: undefined,
  user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedIn(
      state,
      action: PayloadAction<{
        token?: IToken
        user?: User
      }>,
    ) {
      state.status = AuthStatus.LOGGED_IN
      state.token = action.payload.token
      state.user = action.payload.user
    },
    setNotLoggedIn(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload || AuthStatus.NOT_LOGGED_IN
      state.token = undefined
      state.user = undefined
      state.loggedInAccount = []
    },
    setCurrentUser(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user
    },
    setOldAccountLogin(state, action: PayloadAction<LoggedInAccount[]>) {
      state.loggedInAccount = action.payload
    },
  },
})

const getAuthState = (state: RootState) => state.auth

export const getCurrentUser = (state: RootState) => getAuthState(state)
