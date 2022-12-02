/**
 * @since 2022/12/01
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // Check before guard
    const { body } = request
    if (!body || !body.account || !body.password) {
      throw new BadRequestException('Invalid login')
    }

    // Main guard
    return (await super.canActivate(context)) as boolean
  }
}
