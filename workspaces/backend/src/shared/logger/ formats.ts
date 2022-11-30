/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { format } from 'winston'
import { FormatWrap } from 'logform'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stringifySafe = require('json-stringify-safe')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MaskJson = require('mask-json')

const hasOwnProperty = Object.prototype.hasOwnProperty

export const levelFormat: FormatWrap = format((info) => {
  info.level = info.level.toUpperCase()

  const meta = Object.assign({}, info, {})
  delete meta.level
  delete meta.message
  delete meta.timestamp
  info.meta = safeToString(meta)
  if (isEmpty(meta)) {
    info.meta = null
  } else {
    info.meta = safeToString(meta)
    if (info.meta === '{}') {
      info.meta = ''
    }
  }
  return info
})

export const maskFormat: FormatWrap = format((info, opts) => {
  if (!opts.maskConfidential) {
    return info
  }

  try {
    const mask = MaskJson(opts.maskKeys, {
      ignoreCase: true,
      replacement: '********',
    })
    info = mask(info)
    return info
  } catch (error) {
    return info
  }
})

export function isEmpty(obj: any): boolean {
  if (obj == null) return true

  if (obj.length > 0) return false
  if (obj.length === 0) return true

  if (typeof obj !== 'object') return true

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) return false
  }

  return true
}

export function tryParseJsonString(str: string): any {
  try {
    const jsonObj = JSON.parse(str)
    return jsonObj
  } catch (e) {
    return str
  }
}

export function safeToString(json: any, space?: number): string {
  try {
    return JSON.stringify(json, null, space)
  } catch (ex) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return stringifySafe(json, null, null, () => {})
  }
}
