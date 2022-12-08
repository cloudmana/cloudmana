import { BadRequestException, Injectable } from '@nestjs/common'
import { UserRepository } from '../user/user.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import config from 'src/common/config'
import { UserSignupDto } from '../user/dto/user.dto'
import { User } from '../user/user.entity'
import { IPayload } from './interface/auth.interface'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
  constructor(private repository: UserRepository, private jwt: JwtService) {}

  async signup(user: UserSignupDto): Promise<User> {
    const userCheck = await this.repository.findOne({
      where: {
        $or: [{ username: user.username }, { email: user.email }],
      },
    })
    if (userCheck) {
      throw new BadRequestException('Username or email already existed')
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return await this.repository.save(new User(user))
  }

  async login(user: any) {
    const payload: IPayload = {
      username: user.username,
      userId: user.id,
      email: user.email,
      role: user.role,
      roles: user.roles,
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ..._user } = user
    return {
      token: {
        accessToken: this.getAccessToken(payload),
        refreshToken: this.getRefreshToken(payload),
      },
      user: _user,
    }
  }

  async refreshToken(user: any, _: RefreshTokenDto) {
    const payload: IPayload = {
      username: user.username,
      userId: user.id,
      email: user.email,
      role: user.role,
      roles: user.roles,
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ..._user } = user
    return {
      token: {
        accessToken: this.getAccessToken(payload),
        // refreshToken: this.getRefreshToken(payload),
      },
      // user: _user,
    }
  }

  async validateUser(account: string, password: string): Promise<any> {
    const foundUser = await this.repository.findOne({
      where: { $or: [{ username: account }, { email: account }] },
    })

    if (!foundUser) {
      throw new BadRequestException('Username or email not exists')
    }

    if (await bcrypt.compare(password, foundUser.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = foundUser
      return result
    }

    throw new BadRequestException('Account or password is invalid')
  }

  getAccessToken(payload: IPayload) {
    return this.jwt.sign(payload)
  }

  getRefreshToken(payload: IPayload) {
    return this.jwt.sign(payload, {
      expiresIn: config.getString('auth.jwt.expiresInRefreshToken'),
      secret: config.getString('auth.jwt.secretRefreshToken'),
    })
  }
}
