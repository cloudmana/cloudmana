/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useQuery } from '@tanstack/react-query'
import { useToastMessage, ToastTypes } from 'src/hooks/useToastMessage'
import { getList } from './provider.service'
import { IProviderRequest } from './provider.type'
import { IProvider } from 'src/models/provider'

export const useProviderList = (params: IProviderRequest) => {
  const [addToast] = useToastMessage()

  return useQuery<IProvider[]>({
    queryKey: ['providerList'],
    queryFn: () => getList(params),
    onSuccess: (data: any) => {
      return data
    },
    onError: (error: any) => {
      addToast(ToastTypes.ERROR, error)
    },
    retry: false,
  })
}
