/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import _ from 'lodash'
import express from 'express'

import {
  TOTAL_COUNT_HEADER_NAME,
  NEXT_PAGE_HEADER_NAME,
  PAGE_HEADER_NAME,
  PER_PAGE_HEADER_NAME,
  PAGES_COUNT_HEADER_NAME,
} from 'src/common/constants'
import { BaseResponse } from 'src/modules/base/base.response'
import { Readable } from 'stream'
import { HttpException, InternalServerErrorException } from '@nestjs/common'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csvStringify = require('csv-stringify')

export const getStringEnumValues = <E extends Record<keyof E, string>>(e: E): E[keyof E][] =>
  Object.keys(e).map((k) => e[k])

export const promiseResolver = <T>(promise: Promise<T>): Promise<[T, any]> => {
  return new Promise((resolve) => {
    promise
      .then((response: T) => {
        resolve([response, null])
      })
      .catch((error) => {
        resolve([null, error])
      })
  })
}

export type MappedType<T, U> = {
  [P in keyof T]: U
}

export type Element<T extends Array<any>> = T extends (infer U)[] ? U : never

// Funny thing to assert that `key` exists
export type OmitPick<T, IncludedKeys extends keyof T, ExcludedKeys extends keyof T> = Omit<
  Pick<T, IncludedKeys | ExcludedKeys>,
  ExcludedKeys
>

export const getAuthorizationObject = () =>
  process.env.NODE_ENV === 'test'
    ? undefined
    : process.env.backendAuthToken
    ? {
        authorized: {
          bearer: process.env.backendAuthToken,
        },
      }
    : undefined

export const initPaginationMeta = (): IPaginationOptions => {
  return {
    limit: 20,
    page: 1,
  }
}

export const APPLICATION_JSON = 'application/json'
export const ACCESS_TOKEN_HEADER_NAME = 'apiKey'
export const SUB_HEADER_NAME = 'sub'

export const generatePaginationHeaderV2 = (paginatinatedResult: BaseResponse<any>) => {
  const { meta } = paginatinatedResult
  return {
    [TOTAL_COUNT_HEADER_NAME]: meta.totalItems,
    [NEXT_PAGE_HEADER_NAME]:
      meta.currentPage === meta.totalPages ? undefined : meta.currentPage + 1,
    [PAGE_HEADER_NAME]: meta.currentPage,
    [PAGES_COUNT_HEADER_NAME]: meta.totalPages,
    [PER_PAGE_HEADER_NAME]: meta.itemsPerPage,
  }
}

export function genRandomString(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generatePaginationMetadata = (paginatedResult: BaseResponse<any>) => {
  return { ...paginatedResult.meta }
}

export const paginationSpread = (paginatedResult: BaseResponse<any>) => {
  return _.omit(paginatedResult, ['meta', 'items'])
}

export function performance_now(eventName = null) {
  const startTime = new Date().getTime()
  if (eventName) {
    console.info(`performance::Started::${eventName}::${startTime}`)
  }
  return startTime
}

export function performance_elapsed(beginning, log = false) {
  if (!beginning) {
    return 'Please add the start time'
  }
  const duration = new Date().getTime() - beginning
  if (log) {
    console.info(`performance::Ended::${duration / 1000}s`)
  }
  return duration
}

export const readCsvStreamProcess = (csvData: any[]) => {
  const rowSequence = (function* () {
    for (const row in csvData) {
      if (row) {
        yield csvData[row]
      }
    }
  })()

  return new Readable({
    objectMode: true,
    read() {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const { done, value } = rowSequence.next()
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.push(done ? null : value!)
          if (done) {
            break
          }
        } catch (err) {
          this.destroy(err)
        }
      }
    },
  })
    .on('error', (err) => {
      throw new InternalServerErrorException(err)
    })
    .pipe(csvStringify())
    .on('error', (err) => {
      throw new InternalServerErrorException(err)
    })
}

export function getDateUTC() {
  const date = new Date()
  const now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )

  return new Date(now_utc)
}

export function updateResponseException(e: Error, res: express.Response) {
  if (e instanceof HttpException) {
    res.status(e.getStatus()).json({
      message: e.message,
      timestamp: new Date().toISOString(),
    })
  } else {
    throw e
  }
}

export function isString(value) {
  return (typeof value).toUpperCase() == 'STRING'
}

export function isNumeric(str) {
  if ((typeof str).toUpperCase() === 'NUMBER') {
    return true
  }
  if ((typeof str).toUpperCase() != 'STRING') return false // we only process strings!
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

export function isNumericOnlyCheckType(str) {
  return (typeof str).toUpperCase() === 'NUMBER'
}

export function groupBy<T, KeyType>(items: T[], getKey: (item: T) => KeyType): Map<KeyType, T[]> {
  const result = new Map<KeyType, T[]>()
  for (const item of items) {
    const key = getKey(item)
    if (result.get(key)) {
      result.get(key).push(item)
    } else {
      result.set(key, [item])
    }
  }
  return result
}
