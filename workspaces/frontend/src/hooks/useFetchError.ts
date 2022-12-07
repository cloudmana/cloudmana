/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useMemo } from 'react'
import { AxiosError } from 'axios'

export default function useFetchError(error?: Error) {
  const message = useMemo(() => {
    if (!error) return ''

    if ('isAxiosError' in error) {
      const axiosError = error as AxiosError
      const data: any = axiosError.response?.data
      return data?.message?.message?.toString() || data?.message?.toString() || axiosError.toJSON()
    }

    return error.message
  }, [error])

  return { message }
}
