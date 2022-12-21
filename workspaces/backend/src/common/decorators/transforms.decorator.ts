/**
 * @since 2022/12/21
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Transform } from 'class-transformer'
import { SortType, SortTypeNumber } from 'src/common/enums/dto.enum'
import { castArray, isNil, trim } from 'lodash'

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns PropertyDecorator
 * @constructor
 */
export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value

    if (Array.isArray(value)) {
      return value.map((v) => trim(v).replace(/\s\s+/g, ' '))
    }

    return trim(value).replace(/\s\s+/g, ' ')
  })
}

export function ToLowerCase(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value

    if (Array.isArray(value)) {
      return value.map((v) => v.toString().toLowerCase())
    }

    return value.toString().toLowerCase()
  })
}

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value

      return Number.parseInt(value, 10)
    },
    { toClassOnly: true },
  )
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value

      if (isNil(value)) {
        return []
      }

      return castArray(value)
    },
    { toClassOnly: true },
  )
}

export const ToBoolean = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value
    },
    {
      toPlainOnly: true,
    },
  )
  const toClass = (target: any, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToBoolean(obj[key])
      },
      {
        toClassOnly: true,
      },
    )(target, key)
  }
  return function (target: any, key: string) {
    toPlain(target, key)
    toClass(target, key)
  }
}

const valueToBoolean = (value: any) => {
  if (value === null || value === undefined) {
    return undefined
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
    return true
  }
  if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
    return false
  }
  return undefined
}

export function ToSortType(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value

      return value?.toLowerCase() === SortType.ASC ? SortTypeNumber.ASC : SortTypeNumber.DESC
    },
    { toClassOnly: true },
  )
}
