/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { clientApi } from 'src/utils/api'
import { ICredentialsRequest } from './credentials.type'
import { ICredentials } from 'src/models/credentials'

export const getList = (params?: ICredentialsRequest): Promise<ICredentials[]> => {
  return clientApi.get<ICredentials[]>('/api/v1/cloudmana/credentials', params).then((res) => {
    return res.data
  })
}

export const credentialService = {
  getList,
}
