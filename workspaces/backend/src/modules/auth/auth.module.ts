import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'src/common/config'
import { User } from '../user/user.entity'
import { UserRepository } from '../user/user.repository'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: config.getString('auth.jwt.expiresIn') },
      secret: config.getString('auth.jwt.secret'),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
