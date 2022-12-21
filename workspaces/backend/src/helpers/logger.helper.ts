/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Params } from 'nestjs-pino'
import pino from 'pino'
import { ACCESS_TOKEN_HEADER_NAME } from 'src/common/constants'
import { Logger as DbLogger, QueryRunner } from 'typeorm'
import { Logger } from '@nestjs/common'

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
      ...(env !== 'prod'
        ? {
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
          }
        : {}),
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

export class TypeormLogger implements DbLogger {
  private readonly logger = new Logger(TypeormLogger.name)

  logQuery(query: string, _parameters?: any[], queryRunner?: QueryRunner) {
    const requestUrl =
      queryRunner && queryRunner.data['request'] ? '(' + queryRunner.data['request'].url + ') ' : ''
    this.logger.log(requestUrl + 'Executing query: ' + query)
  }

  logQueryError(
    error: string | Error,
    query: string,
    _parameters?: any[],
    _queryRunner?: QueryRunner,
  ) {
    this.logger.error({ error, query: 'Executing query: ' + query })
  }

  logQuerySlow(_time: number, _query: string, _parameters?: any[], _queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.')
  }

  logSchemaBuild(_message: string, _queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.')
  }

  logMigration(_message: string, _queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.')
  }

  log(_level: 'log' | 'warn' | 'info', _message: any, _queryRunner?: QueryRunner) {
    throw new Error('Method not implemented.')
  }
}
