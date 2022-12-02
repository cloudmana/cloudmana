import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { User } from '../user/user.entity'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard'
import { GetUser } from './decorator/get-user.decorator'
import { UserLoginRequestDto, UserSignupDto } from '../user/dto/user.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserSignupDto): Promise<User> {
    return this.usersService.signup(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    // Only for show input on swagger
    @Body() _: UserLoginRequestDto,
  ) {
    return this.usersService.login(req.user)
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@GetUser() user: User, @Body() token: RefreshTokenDto) {
    return this.usersService.refreshToken(user, token)
  }
}
