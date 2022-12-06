/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useEffect, useState } from 'react'

export default function useIsEndPage() {
  const [isEndPage, setIsEndPage] = useState<boolean>(false)

  const handleScroll = () => {
    const position = window.pageYOffset
    setIsEndPage(document.body.offsetHeight <= window.innerHeight + Math.ceil(position))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isEndPage
}
