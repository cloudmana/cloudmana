/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { clientApi } from 'src/utils/api'
import { ILoginRequest, ILoginResponse } from './auth.type'

export const postLogin = (data: ILoginRequest): Promise<ILoginResponse> => {
  return clientApi.post<ILoginResponse>('/api/v1/cloudmana/auth/login', data).then((res) => {
    if (res.data) {
      return res.data
    }
    return {} as ILoginResponse
  })
}
