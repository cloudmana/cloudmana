/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

export interface ScrollTopProps {}

const ScrollTop = ({ children }: React.PropsWithChildren<ScrollTopProps>) => {
  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return <>{children}</> || <></>
}

export default ScrollTop
