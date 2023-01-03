/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useQuery } from '@tanstack/react-query'
import { useToastMessage, ToastTypes } from 'src/hooks/useToastMessage'
import { IUser } from 'src/models/user'
import { getProfile } from './user.service'

export const useGetProfile = () => {
  const [addToast] = useToastMessage()

  return useQuery<IUser>({
    queryKey: ['userProfile'],
    queryFn: () => getProfile(),
    onSuccess: (data: any) => {
      return data
    },
    onError: (_error: any) => {
      addToast(ToastTypes.ERROR, 'Login expired')
    },
    retry: false,
  })
}
