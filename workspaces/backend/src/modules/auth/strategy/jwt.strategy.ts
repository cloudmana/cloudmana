import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import config from 'src/common/config'
import { IPayload } from '../interface/auth.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      signOptions: { expiresIn: config.getString('auth.jwt.expiresIn') },
      secretOrKey: config.getString('auth.jwt.secret'),
    })
  }

  async validate(payload: IPayload) {
    return { userId: payload.userId, username: payload.username, role: payload.role }
  }
}
