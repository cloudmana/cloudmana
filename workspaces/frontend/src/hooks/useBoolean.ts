/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { useCallback, useState } from 'react'

export function useBoolean(initialValue = false): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  return [
    value,
    useCallback(() => setValue(true), []),
    useCallback(() => setValue(false), []),
    useCallback(() => setValue((_value) => !_value), []),
  ]
}
