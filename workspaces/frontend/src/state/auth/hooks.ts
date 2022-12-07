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
import { AuthState, AuthStatus, User } from './types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DependencyList, useEffect, useMemo } from 'react'
import { setOpenModal } from '../application/actions'
import { clientApi } from '../../utils/api'
import { useSetPendingSwitchAcc } from '../application/hooks'
import { ToastTypes, useToast } from 'src/components/ToastProvider'
import { useUpdateNotification } from '../notification/hooks'

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
  const { status: authStatus, token } = useAuthState()
  const setPendingAcc = useSetPendingSwitchAcc()
  const { addToast } = useToast()
  const updateNotify: any = useUpdateNotification()

  const [{ loading, error }, login] = useAsyncFn(async () => {
    try {
      setPendingAcc(true)
      const {
        data: { token },
      } = await axios.post<{
        token: string
      }>(`${env.SERVER_API}/api/v1/cloudmana/auth/login`, {
        username: '',
      })

      setPendingAcc(false)

      if (token) {
        dispatch(
          authSlice.actions.setLoggedIn({
            token,
          }),
        )
        updateNotify()(window as any).gtag('event', 'login_click', {
          event_label: 'Login',
          event_category: 'login_click',
        })
        addToast({ type: ToastTypes.SUCCESS, content: 'Connected to account successfully!' })
      } else {
        addToast({ type: ToastTypes.ERROR, content: 'Failed to connect to account!' })
      }

      dispatch(setOpenModal(null))
    } catch (error: any) {
      if (error?.response && error?.response?.data?.message?.statusCode === 400) {
        addToast({ type: ToastTypes.ERROR, content: error.response.data.message.message })
      } else if (error.code === 4001) {
        addToast({ type: ToastTypes.ERROR, content: 'User denied message signature!' })
      } else {
        addToast({ type: ToastTypes.ERROR, content: 'Transaction has been failed!' })
      }
      dispatch(authSlice.actions.setNotLoggedIn(AuthStatus.DEACTIVATE))
      dispatch(setOpenModal(null))
    }
  }, [dispatch, authStatus, token])

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
