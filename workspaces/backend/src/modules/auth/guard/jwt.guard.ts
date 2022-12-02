import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { ROLES_KEY } from '../decorator/role.decorator'
import { Role } from '../enums/role.enum'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super(reflector)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Collect roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // Main guard
    const mainGuard = (await super.canActivate(context)) as boolean
    if (!mainGuard) {
      throw new UnauthorizedException()
    }
    if (!requiredRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    if (!user) {
      throw new UnauthorizedException()
    }

    if (!requiredRoles.some((role) => user.role === role)) {
      throw new ForbiddenException(`Area only for ${requiredRoles.join(', ')} role(s)`)
    }
  }
}
