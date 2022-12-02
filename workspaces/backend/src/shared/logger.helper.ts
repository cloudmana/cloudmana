/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Params } from 'nestjs-pino'
import pino from 'pino'
import { ACCESS_TOKEN_HEADER_NAME } from 'src/common/constants'

const PROD_MASK_PATH = [`req.headers["${ACCESS_TOKEN_HEADER_NAME}"]`]
const DEBUG_MASK_PATH = [`req.headers["${ACCESS_TOKEN_HEADER_NAME}"]`]

export function loggerConfig(env: string, auto: boolean): Params {
  return {
    pinoHttp: {
      level: env !== 'prod' ? 'debug' : 'info',
      redact: {
        paths: env !== 'prod' ? DEBUG_MASK_PATH : PROD_MASK_PATH,
        censor: '***',
      },
      serializers: {
        err: pino.stdSerializers.err,
        req: (req) => {
          req.body = req.raw.body
          return req
        },
      },
      autoLogging: auto,
    },
  }
}
