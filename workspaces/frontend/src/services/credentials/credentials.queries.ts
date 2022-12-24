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
import { IBaseResponse } from 'src/models/base'
import { ICredentials } from 'src/models/credentials'

export const useCredentialsList = (data: ICredentialsRequest) => {
  const [addToast] = useToastMessage()

  return useQuery<ICredentials[]>({
    queryKey: ['credentialsList'],
    queryFn: () => getList(data),
    onSuccess: (data: any) => {
      console.log(data)
      return data
    },
    onError: (error: any) => {
      console.log(error)
      // addToast(ToastTypes.ERROR, error.response.data.message.message)
    },
    retry: false,
  })
}
