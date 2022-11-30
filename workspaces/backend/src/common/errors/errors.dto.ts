/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IError } from './errors.interface'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ResponseErrorDto implements IError {
  @ApiProperty({
    type: 'string',
    description: 'Response error code',
  })
  readonly errorCode: string

  @ApiProperty({
    type: 'number',
    description: 'Response status code',
  })
  readonly statusCode: number

  @ApiProperty({
    type: 'string',
    description: 'Error description',
  })
  readonly description: string

  @ApiProperty({
    type: 'string',
    description: 'Error message',
  })
  readonly message: string

  @ApiPropertyOptional({
    type: 'object',
    description: 'Error stack trace',
  })
  readonly stackTrace?: any
}
