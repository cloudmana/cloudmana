/**
 * @since 2022/12/20
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PrimaryIdType } from 'src/common/types/entity.type'
import { IsColumnId } from 'src/common/decorators/validator.decorator'

export class CredentialsImportDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'Name',
    default: '',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'accessKeyId',
    default: '',
  })
  accessKeyId: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'secretAccessKey',
    default: '',
  })
  secretAccessKey: string

  @IsColumnId()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'providerId',
    default: '',
  })
  provider: PrimaryIdType
}

export class CredentialsUpdateDto extends CredentialsImportDto {
  @IsColumnId()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '_id',
    default: '',
  })
  _id: PrimaryIdType

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'accessKeyId',
    default: '',
  })
  accessKeyId: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'secretAccessKey',
    default: '',
  })
  secretAccessKey: string

  @IsColumnId()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'providerId',
    default: '',
  })
  provider: PrimaryIdType
}

export class CredentialsDeleteDto {
  @IsArray()
  @IsNotEmptyObject()
  @ApiProperty({
    type: Array<String | number>,
    required: true,
    description: 'List IDs',
    default: [],
  })
  _ids: Array<PrimaryIdType>
}
