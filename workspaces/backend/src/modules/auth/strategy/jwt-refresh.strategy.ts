/**
 * @since 2022/12/01
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Repository } from 'typeorm'
import config from 'src/common/config'
import { User } from '../../user/user.entity'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      signOptions: { expiresIn: config.getString('auth.jwt.expiresInRefreshToken') },
      secretOrKey: config.getString('auth.jwt.secretRefreshToken'),
    })
  }

  async validate(payload: any) {
    const { username } = payload
    const user = await this.repository.findOne({ where: [{ username }, { email: username }] })

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
