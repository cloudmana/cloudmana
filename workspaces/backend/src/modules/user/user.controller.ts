/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { BaseResponse } from '../base/base.response'
import { User } from './user.entity'
import { UserService } from './user.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@ApiTags('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: User): Promise<BaseResponse<User>> {
    return await this.userService.getProfile(user)
  }
}
