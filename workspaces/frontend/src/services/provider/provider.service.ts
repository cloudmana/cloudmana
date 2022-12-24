/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { clientApi } from 'src/utils/api'
import { IProviderRequest } from './provider.type'
import { IProvider } from 'src/models/provider'

export const getList = (data?: IProviderRequest): Promise<IProvider[]> => {
  return clientApi.get<IProvider[]>('/api/v1/cloudmana/providers', data).then((res) => {
    return res.data
  })
}

export const credentialService = {
  getList,
}
