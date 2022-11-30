/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { transports, format } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'
import { Format } from 'logform'
import { levelFormat, maskFormat } from './ formats'
const { combine, timestamp, colorize, splat } = format

export default class ConsoleLogs {
  public Transport: ConsoleTransportInstance

  constructor(maskConfidential = false, maskKeys?: string[]) {
    this.Transport = this.setTransport(maskConfidential, maskKeys)
  }

  setTransport(maskConfidential = false, maskKeys?: string[]): ConsoleTransportInstance {
    return new transports.Console({
      format: this.setFormat(maskConfidential, maskKeys),
    })
  }

  private setFormat(maskConfidential: boolean, maskKeys?: string[]): Format {
    return combine(
      timestamp(),
      maskFormat({ maskConfidential, maskKeys }),
      levelFormat(),
      splat(),
      colorize({ all: true }),
    )
  }
}
