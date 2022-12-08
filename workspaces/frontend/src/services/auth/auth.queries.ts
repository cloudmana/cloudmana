/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useToastMessage, ToastTypes } from 'src/hooks/useToastMessage'
import { postLogin } from './auth.service'
import { ILoginRequest } from './auth.type'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const [addToast] = useToastMessage()
  const router = useRouter()

  return useMutation((data: ILoginRequest) => postLogin(data), {
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['login'] })
      addToast(ToastTypes.SUCCESS, 'Login successfully!')
      router.push('/')
    },
    onError: (error: any) => {
      addToast(ToastTypes.ERROR, error.response.data.message.message)
    },
    retry: false,
  })
}
