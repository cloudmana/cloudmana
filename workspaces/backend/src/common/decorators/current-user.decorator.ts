/**
 * @since 2022/12/01
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from 'src/modules/user/user.entity'

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
})
