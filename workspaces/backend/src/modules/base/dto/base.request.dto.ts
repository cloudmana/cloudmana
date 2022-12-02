/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class JwtWalletAuthPayloadDto {
  accountAddress: string
  iat: number
  exp: number
}

export class BaseRequestDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  keyword?: string

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  page?: number

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  perPage?: number

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsOptional()
  sortDate?: string

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsOptional()
  startDate?: Date

  @ApiProperty({
    required: false,
    type: Date,
  })
  @IsOptional()
  endDate?: Date

  @ApiPropertyOptional({
    type: Number,
    example: 2,
    description:
      'The only option available is `2`. The difference is version 2 will use `metadata` as pagination info',
  })
  @IsOptional()
  paginationVersion?: number
}
