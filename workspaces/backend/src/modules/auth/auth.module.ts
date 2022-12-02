import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategy/jwt.strategy'
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategy/local.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from 'src/common/config'
import { User } from '../user/user.entity'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: config.getString('auth.jwt.expiresIn') },
      secret: config.getString('auth.jwt.secret'),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
