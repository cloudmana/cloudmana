/**
 * @since 2022/12/20
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsArray, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'providerId',
    default: '',
  })
  providerId: number | string
}

export class CredentialsUpdateDto extends CredentialsImportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: '_id',
    default: '',
  })
  _id: number | string

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

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    description: 'providerId',
    default: '',
  })
  providerId: number | string
}

export class CredentialsDeleteDto {
  @IsArray()
  @IsNotEmptyObject()
  @ApiProperty({
    type: Array<String>,
    required: true,
    description: 'List IDs',
    default: [],
  })
  _ids: Array<number | string>
}
