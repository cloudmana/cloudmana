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
      return (
        // @ts-ignore
        axiosError.response?.data?.message?.message?.toString() ||
        // @ts-ignore
        axiosError.response?.data?.message?.toString() ||
        axiosError.toJSON()
      )
    }

    return error.message
  }, [error])

  return { message }
}
