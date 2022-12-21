/**
 * @since 2022/12/21
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsEnum, IsOptional, IsPositive, Max } from 'class-validator'
import { ToInt, ToSortType } from 'src/common/decorators/transforms.decorator'
import { SortType, SortTypeNumber } from 'src/common/enums/dto.enum'

import { ApiProperty } from '@nestjs/swagger'

export class PaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @ToInt()
  @IsPositive()
  page?: number

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @ToInt()
  @IsPositive()
  @Max(1000)
  limit?: number

  @ApiProperty({ required: false, default: 2 })
  @IsOptional()
  @ToInt()
  @IsPositive()
  @Max(2)
  paginationVersion?: number
}

export class SortDto<T = string> {
  @IsOptional()
  sortBy?: T

  @ApiProperty({ enum: SortType, required: false })
  @IsOptional()
  @ToSortType()
  @IsEnum(SortTypeNumber)
  sortType?: SortTypeNumber
}

export class PaginationDtoAndSortDto<T = string> extends PaginationDto {
  @IsOptional()
  sortBy?: T

  @ApiProperty({ enum: SortType, required: false })
  @IsOptional()
  @ToSortType()
  @IsEnum(SortTypeNumber)
  sortType?: SortTypeNumber
}
