/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import axios from 'axios'
import { Store } from '../state'
import env from '../config/env'
import { isNil } from '../functions/validate'
import { authSlice, getCurrentUser } from '../state/auth'
import { AuthStatus } from '../state/auth/types'

export const clientApi = axios.create({ baseURL: env.SERVER_API })

export const setupAuthInterceptor = (store: Store) => {
  clientApi.interceptors.request.use((requestConfig) => {
    const { token } = getCurrentUser(store.getState())
    if (token) {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return requestConfig
  })

  // Response interceptor for API calls
  clientApi.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      if (isNil(error.response)) {
        return Promise.reject(error)
      } else if (error.response.status === 401) {
        store.dispatch(authSlice.actions.setNotLoggedIn(AuthStatus.DEACTIVATE))
      } else if (error.response.status === 500) {
        // store.dispatch(setErrorApp({ code: error.code, message: 'Something went wrong' }));
        return Promise.reject(error)
      } else if (!error.response || error.response.status !== 401) {
        return Promise.reject(error)
      }
      return Promise.reject('something went wrong')
    },
  )
}
