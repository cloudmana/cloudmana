/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class ErrorModel {
  @ApiProperty()
  @IsString()
  statusCode: string

  @ApiProperty()
  @IsString()
  message: string

  @ApiProperty()
  @IsString()
  timestamp: string

  @ApiProperty()
  @IsString()
  path: string
}
