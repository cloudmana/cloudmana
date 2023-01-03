/**
 * @since 2022/12/07
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IBaseResponse } from 'src/models/base'
import { IUser } from 'src/models/user'
import { clientApi } from 'src/utils/api'

export const getProfile = (): Promise<IUser> => {
  return clientApi.get<IBaseResponse<IUser>>('/api/v1/cloudmana/user/profile').then((res) => {
    return res.data.data
  })
}
