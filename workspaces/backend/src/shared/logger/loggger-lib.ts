/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { loggers, Logger, LoggerOptions, format } from 'winston'
import TransportStream from 'winston-transport'
import uuidV4 from 'uuid'
import { ICentralizedLoggerConfigs, ILogEntry } from './lib-loggers.interface'
import { LoggerLevels, LogLevel } from './log-levels'
import { maskFormat, tryParseJsonString } from './ formats'
import ConsoleLogs from './console-logs'

export { Logger } from 'winston'
export { LogLevel } from './log-levels'
export { ICentralizedLoggerConfigs, ILogEntry } from './lib-loggers.interface'

const { combine } = format

export default class CentralizedLogger extends TransportStream {
  private DEFAULT_LOGGER_OPTIONS: ICentralizedLoggerConfigs = {
    name: 'Main',
    maskConfidential: true,
    exitOnError: false,
    enableConsole: true,
  }

  public Console: Logger
  public Container: Logger

  constructor(configs: ICentralizedLoggerConfigs, opts?: TransportStream.TransportStreamOptions) {
    super(opts)
    const LoggerConfigs = { ...this.DEFAULT_LOGGER_OPTIONS, ...configs }
    const CSL = new ConsoleLogs(LoggerConfigs.maskConfidential, LoggerConfigs.maskKeys)
    this.Console = CentralizedLogger.addConsoleLogger(CSL.Transport, LoggerConfigs.exitOnError)
    this.Container = this.addLoggers(LoggerConfigs, CSL.Transport)
  }

  private static addConsoleLogger(consoleTransport: TransportStream, exitOnError = false): Logger {
    const loggerOptions: LoggerOptions = {
      level: LogLevel.Debug,
      levels: LoggerLevels,
      exitOnError,
      transports: [consoleTransport],
    }
    return loggers.add('main-console', loggerOptions)
  }

  addLoggers(configs: ICentralizedLoggerConfigs, consoleTransport: TransportStream): Logger {
    const transports: TransportStream[] = []

    if (configs.enableConsole) {
      transports.push(consoleTransport)
    }

    const loggerOptions: LoggerOptions = {
      level: LogLevel.Debug,
      levels: LoggerLevels,
      exitOnError: configs.exitOnError,
      format: combine(
        maskFormat({
          maskConfidential: configs.maskConfidential,
          maskKeys: configs.maskKeys,
        }),
      ),
      transports,
    }

    return loggers.add(configs.name, loggerOptions)
  }

  end() {
    this.Container.end(() => this.Container.close())
    return this
  }

  httpRequestLog(req: any, res: any, next: any) {
    const requestLog = {
      timestamp: new Date().toISOString(),
      correlationId: req.correlationId,
      level: LogLevel.Debug,
      clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      method: req.method,
      originalUri: req.originalUrl,
      uri: req.url,
      referer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      message: `HTTP Request - ${req.correlationId}`,
      request: {
        body: tryParseJsonString({ ...req.body }),
        headers: req.headers,
      },
    }
    res.setHeader('x-request-id', req.correlationId)

    this.log(requestLog)
    next()
  }

  httpResponseLog(req: any, res: any, next: any) {
    const rawResponse = res.write
    const rawResponseEnd = res.end
    const chunks: any[] = []
    res.write = (...restArgs: any[]) => {
      chunks.push(new Buffer(restArgs[0]))
      rawResponse.apply(res, restArgs)
    }
    res.end = (...restArgs: any[]) => {
      if (restArgs[0]) {
        chunks.push(new Buffer(restArgs[0]))
      }
      const body = Buffer.concat(chunks).toString('utf8')
      const responseLog = {
        timestamp: new Date().toISOString(),
        correlationId: req.correlationId,
        level: LogLevel.Debug,
        statusCode: res.statusCode,
        clientIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        originalUri: req.originalUrl,
        uri: req.url,
        referer: req.headers.referer || '',
        userAgent: req.headers['user-agent'],
        message: `HTTP Response - ${req.correlationId}`,
        request: {
          body: req.body,
          headers: req.headers,
        },
        response: {
          body: tryParseJsonString(body),
          headers: res.getHeaders(),
        },
      }

      this.log(responseLog)
      rawResponseEnd.apply(res, restArgs)
    }

    next()
  }

  log(logEntry: ILogEntry) {
    if (!logEntry.timestamp) {
      logEntry.timestamp = new Date().toISOString()
    }

    this.Container.log(logEntry)
  }

  debug(message: string, data?: any) {
    this.log({
      level: LogLevel.Debug,
      message,
      data,
    })
  }

  info(message: string, data?: any) {
    this.log({
      level: LogLevel.Info,
      message,
      data,
    })
  }

  notice(message: string, data?: any) {
    this.log({
      level: LogLevel.Notice,
      message,
      data,
    })
  }

  warning(message: string, data?: any) {
    this.log({
      level: LogLevel.Warning,
      message,
      data,
    })
  }

  error(message: string, data?: any) {
    this.log({
      level: LogLevel.Error,
      message,
      data,
    })
  }

  crit(message: string, data?: any) {
    this.log({
      level: LogLevel.Crit,
      message,
      data,
    })
  }

  alert(message: string, data?: any) {
    this.log({
      level: LogLevel.Alert,
      message,
      data,
    })
  }

  emerg(message: string, data?: any) {
    this.log({
      level: LogLevel.Emerg,
      message,
      data,
    })
  }

  async getInstanceId(): Promise<any> {
    return new Promise((resolve) => {
      return resolve(uuidV4())
    })
  }
}
