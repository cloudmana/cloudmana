/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { escapeRegExp } from './index'

const inputRegex = RegExp('^\\d*(?:\\\\[.])?\\d*$') // m
/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString: string): boolean {
  return /^0x0*$/.test(hexNumberString)
}

export const isNil = (value: any): value is undefined | null =>
  typeof value === 'undefined' || value === null || String(value) == 'NaN'

export const isEmpty = (value: any): boolean => {
  if (isNil(value)) {
    return true
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return value.length === 0
}

export const enforcer = (nextUserInput: string, onUserInput: (input: string) => void) => {
  if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
    onUserInput(nextUserInput)
  }
}
