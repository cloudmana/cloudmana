/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'

export class UserSignupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    default: '',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'username',
    default: '',
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    default: '',
  })
  password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'firstName',
    default: '',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'lastName',
    default: '',
  })
  lastName: string
}

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'firstName',
    default: '',
  })
  firstName: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'lastName',
    default: '',
  })
  lastName: string
}

export class UserLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'username or email',
    default: '',
  })
  account: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    default: '',
  })
  password: string
}

export class UserLoginDto {
  @ApiResponseProperty()
  firstName: string

  @ApiResponseProperty()
  lastName: string
}
