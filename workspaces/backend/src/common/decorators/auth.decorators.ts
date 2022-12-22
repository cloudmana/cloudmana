/**
 * @since 2022/12/02
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { RoleAdmin } from 'src/common/decorators/role.decorator'
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt.guard'
import { ApiErrorResponses } from 'src/modules/_shared/sample.decorator'

export function Auth(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth(), ApiErrorResponses())
}

export function AuthAdmin(): MethodDecorator & ClassDecorator {
  return applyDecorators(Auth(), RoleAdmin())
}
