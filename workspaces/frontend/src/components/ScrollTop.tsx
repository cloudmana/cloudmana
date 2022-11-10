import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

export interface ScrollTopProps {}

const ScrollTop = ({ children }: React.PropsWithChildren<ScrollTopProps>) => {
  const location = useLocation()
  const { pathname } = location

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
