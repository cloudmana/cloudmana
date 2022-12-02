/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { HttpStatus } from '@nestjs/common'

export interface IError {
  message: string
  errorCode: string
  description: string
  statusCode: HttpStatus
  stackTrace?: any
}
