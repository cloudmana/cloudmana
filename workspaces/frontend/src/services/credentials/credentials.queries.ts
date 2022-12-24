/**
 * @since 2022/12/24
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useQuery } from '@tanstack/react-query'
import { useToastMessage, ToastTypes } from 'src/hooks/useToastMessage'
import { getList } from './credentials.service'
import { ICredentialsRequest } from './credentials.type'
import { ICredentials } from 'src/models/credentials'

export const useCredentialsList = (params?: ICredentialsRequest) => {
  const [addToast] = useToastMessage()

  return useQuery<ICredentials[]>({
    queryKey: ['credentialsList'],
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
