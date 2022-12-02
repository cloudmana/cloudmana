/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { LogLevel } from './log-levels'

export interface ICentralizedLoggerConfigs {
  name: string
  maskConfidential?: boolean
  maskKeys?: string[]
  exitOnError?: boolean
  enableConsole?: boolean
  enableCwl?: boolean
  enableLogzio?: boolean
}
export interface ILogEntry {
  timestamp?: string
  level: LogLevel
  message: string
  [optionName: string]: any
}
