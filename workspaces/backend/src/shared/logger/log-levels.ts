/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

export enum LogLevel {
  Emerg = 'emerg',
  Alert = 'alert',
  Crit = 'crit',
  Error = 'error',
  Warning = 'warning',
  Notice = 'notice',
  Info = 'info',
  Debug = 'debug',
}

export const LoggerLevels = {
  [LogLevel.Emerg]: 0,
  [LogLevel.Alert]: 1,
  [LogLevel.Crit]: 2,
  [LogLevel.Error]: 3,
  [LogLevel.Warning]: 4,
  [LogLevel.Notice]: 5,
  [LogLevel.Info]: 6,
  [LogLevel.Debug]: 7,
}
