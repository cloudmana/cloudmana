import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import config from 'src/common/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      signOptions: { expiresIn: config.getString('auth.jwt.expiresIn') },
      secretOrKey: config.getString('auth.jwt.secret'),
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, role: payload.role }
  }

  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
  //   const req: Request = context.switchToHttp().getRequest()

  //   const token = req.headers['Auth']

  //   const payload = this.jwtService.verify(token)

  //   console.log('VERIFICATION', payload)

  //   return true
  // }
}
