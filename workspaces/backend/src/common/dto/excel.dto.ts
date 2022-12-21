/**
 * @since 2022/12/21
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExcelDto {
  @ApiProperty()
  @IsOptional()
  readonly isExcel?: boolean
}
