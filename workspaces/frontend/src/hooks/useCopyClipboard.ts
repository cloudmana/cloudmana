/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import copy from 'copy-to-clipboard'
import { useCallback, useEffect, useState } from 'react'

export default function useCopyClipboard(timeout = 500): [boolean, (toCopy: string) => void] {
  const [isCopied, setIsCopied] = useState(false)

  const staticCopy = useCallback((text: any) => {
    const didCopy = copy(text)
    setIsCopied(didCopy)
  }, [])

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false)
      }, timeout)

      return () => {
        clearTimeout(hide)
      }
    }
    return undefined
  }, [isCopied, setIsCopied, timeout])

  return [isCopied, staticCopy]
}
