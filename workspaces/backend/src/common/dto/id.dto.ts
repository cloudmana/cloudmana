/**
 * @since 2022/12/21
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsMongoId, IsNotEmpty } from 'class-validator'
import { ToLowerCase, Trim } from 'src/common/decorators/transforms.decorator'

import { ApiProperty } from '@nestjs/swagger'

export class MongoIdDto {
  @ApiProperty()
  @IsMongoId()
  id: string
}

export class SlugDto {
  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  @ToLowerCase()
  slug: string
}
