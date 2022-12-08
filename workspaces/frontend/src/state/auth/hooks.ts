/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import useAsyncFn from 'react-use/lib/useAsyncFn'
import axios from 'axios'
import env from '../../config/env'
import { authSlice } from './index'
import { AppState } from '../index'
import { AuthState, AuthStatus, LoggedInAccount, User } from './types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DependencyList, useEffect, useMemo } from 'react'
import { setOpenModal } from '../application/actions'
import { clientApi } from '../../utils/api'
import { useSetPendingSwitchAcc } from '../application/hooks'
import { ToastTypes, useToastMessage } from 'src/hooks/useToastMessage'
// import { useUpdateNotification } from '../notification/hooks'
import { ILoginRequest } from 'src/services/auth/auth.type'

export function useAuthState(): AuthState {
  return useAppSelector((state: AppState) => state.auth)
}

export function useAuthFetch() {
  const token = useAppSelector((state: AppState) => state.auth.token)
  return useMemo(() => {
    return axios.create({
      baseURL: env.SERVER_API,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [token])
}

export function useLogin() {
  const dispatch = useAppDispatch()
  const [addToast] = useToastMessage()
  const { status: authStatus, token } = useAuthState()
  const setPendingAcc = useSetPendingSwitchAcc()
  // const updateNotify: any = useUpdateNotification()

  const [{ loading, error }, login] = useAsyncFn(
    async (data: ILoginRequest) => {
      try {
        setPendingAcc(true)
        const {
          data: { token, user },
        } = await axios.post<LoggedInAccount>(`${env.SERVER_API}/api/v1/cloudmana/auth/login`, data)

        setPendingAcc(false)

        if (token) {
          dispatch(
            authSlice.actions.setLoggedIn({
              token,
              user,
            }),
          )
          // updateNotify()(window as any).gtag('event', 'login_click', {
          //   event_label: 'Login',
          //   event_category: 'login_click',
          // })
          addToast(ToastTypes.SUCCESS, 'Login successfully!')
          return true
        } else {
          addToast(ToastTypes.ERROR, 'Failed to login!')
        }

        dispatch(setOpenModal(null))
      } catch (error: any) {
        if (error?.response && error?.response?.data?.message?.statusCode === 400) {
          addToast(ToastTypes.ERROR, error.response.data.message.message)
        } else {
          addToast(ToastTypes.ERROR, 'Something was wrong!')
        }
        dispatch(authSlice.actions.setNotLoggedIn(AuthStatus.DEACTIVATE))
        dispatch(setOpenModal(null))
      }
      return false
    },
    [dispatch, authStatus, token],
  )

  return {
    login,
    loading,
    error,
  }
}

export function useAutoFetchCurrentUser(dependencies: DependencyList = []) {
  const appDispatch = useAppDispatch()
  const { token } = useAuthState()

  const [, fetchCurrentUser] = useAsyncFn(async () => {
    const { data: user } = await clientApi.get<User>('api/cloudmana/profile/me')

    appDispatch(authSlice.actions.setCurrentUser({ user }))
  }, [fetch, appDispatch])

  useEffect(() => {
    if (token) {
      fetchCurrentUser()
    }
  }, [...dependencies, token])
}

export function useError() {
  return useAppSelector((state: AppState) => state.application.error)
}
