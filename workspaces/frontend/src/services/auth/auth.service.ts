/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IUser } from 'src/models/user'
import { clientApi } from 'src/utils/api'
import { ILoginRequest, ILoginResponse, IRegisterRequest } from './auth.type'

export const postLogin = (data: ILoginRequest): Promise<ILoginResponse> => {
  return clientApi.post<ILoginResponse>('/api/v1/cloudmana/auth/login', data).then((res) => {
    return res.data
  })
}

export const postRegister = (data: IRegisterRequest): Promise<IUser> => {
  return clientApi.post<IUser>('/api/v1/cloudmana/auth/signup', data).then((res) => {
    return res.data
  })
}
