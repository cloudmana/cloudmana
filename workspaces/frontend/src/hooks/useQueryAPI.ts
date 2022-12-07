/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useState } from 'react'

export function useQueryAPI(callback: any, onSuccess?: any) {
  const [dataApi, setDataApi] = useState<any>()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  async function callApi(params?: any) {
    try {
      setIsSuccess(false)
      let data
      if (params) {
        data = await callback(params)
      } else {
        data = await callback()
      }
      if (onSuccess) {
        onSuccess(data)
      }
      // console.log(data);
      setDataApi(data)
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //     callApi()
  // }, [])

  return { dataApi, isSuccess, callApi }
}
