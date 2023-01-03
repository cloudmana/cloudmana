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
import { AuthState, AuthStatus, LoggedInAccount } from './types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DependencyList, useEffect, useMemo } from 'react'
import { setOpenModal } from '../application/actions'
import { useSetPendingSwitchAcc } from '../application/hooks'
import { ToastTypes, useToastMessage } from 'src/hooks/useToastMessage'
// import { useUpdateNotification } from '../notification/hooks'
import { ILoginRequest, IRegisterRequest } from 'src/services/auth/auth.type'
import { postRegister } from 'src/services/auth/auth.service'
import { getProfile } from 'src/services/user/user.service'

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

export function useRegister() {
  const dispatch = useAppDispatch()
  const [addToast] = useToastMessage()
  const { status: authStatus, token } = useAuthState()
  const setPendingAcc = useSetPendingSwitchAcc()

  const [{ loading, error }, register] = useAsyncFn(
    async (data: IRegisterRequest) => {
      try {
        setPendingAcc(true)
        const user = await postRegister(data)
        setPendingAcc(false)
        if (user) {
          addToast(ToastTypes.SUCCESS, 'Register successfully!')
          return true
        } else {
          addToast(ToastTypes.ERROR, 'Failed to register!')
        }
      } catch (error: any) {
        if (error?.response && error?.response?.data?.message?.statusCode === 400) {
          addToast(ToastTypes.ERROR, error.response.data.message.message)
        } else {
          addToast(ToastTypes.ERROR, 'Something was wrong!')
        }
      }
      return false
    },
    [dispatch, authStatus, token],
  )

  return {
    register,
    loading,
    error,
  }
}

export function useAutoFetchCurrentUser(dependencies: DependencyList = []) {
  const appDispatch = useAppDispatch()
  const { token } = useAuthState()

  const [, fetchCurrentUser] = useAsyncFn(async () => {
    const user = await getProfile()

    appDispatch(authSlice.actions.setCurrentUser({ user } as any))
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
