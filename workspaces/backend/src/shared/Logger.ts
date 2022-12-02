/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import httpContext from 'express-http-context'
import config from 'config'
import { LogLevel } from './logger/log-levels'
import { ICentralizedLoggerConfigs } from './logger/lib-loggers.interface'
import CentralizedLogger from './logger/loggger-lib'

const clwEnvs = ['development', 'staging', 'pre-prod', 'prod']

const env = process.env.NODE_ENV || 'development'
export const isLog = clwEnvs.includes(env)

function setCentralizedLoggerConfig(): ICentralizedLoggerConfigs {
  const tempConfig = config.get<ICentralizedLoggerConfigs>('centralizedLogger')
  return {
    name: tempConfig.name,
    maskConfidential: `${tempConfig.maskConfidential}` === 'true',
    maskKeys: tempConfig.maskKeys,
    exitOnError: `${tempConfig.exitOnError}` === 'true',
    enableConsole: `${tempConfig.enableConsole}` === 'true',
  }
}

const coreLoggerConfig: ICentralizedLoggerConfigs = setCentralizedLoggerConfig()

export const CoreLogger = new CentralizedLogger(coreLoggerConfig)

export function errorLog(
  methodName: string,
  data?: any,
  customMessage?: string,
  correlationId?: string,
): void {
  log(LogLevel.Error, methodName, data, customMessage, correlationId)
}

export function debugLog(
  methodName: string,
  data?: any,
  customMessage?: string,
  correlationId?: string,
): void {
  log(LogLevel.Debug, methodName, data, customMessage, correlationId)
}

function log(
  logLevel: LogLevel,
  methodName: string,
  data?: any,
  customMessage?: string,
  correlationId?: string,
): void {
  if (isLog) {
    CoreLogger.log({
      level: logLevel,
      message: customMessage
        ? `${methodName} - ${correlationId} - ${customMessage}`
        : `${methodName} - ${correlationId}`,
      correlationId,
      methodName,
      userId: httpContext.get('userId'),
      data,
    })
  }
}
