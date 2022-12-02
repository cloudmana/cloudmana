import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getUserId(auth: string): string {
    const jwt = auth.replace('Bearer ', '')
    const base64Payload = jwt.split('.')[1]
    const payloadBuffer = Buffer.from(base64Payload, 'base64')
    const updatedJwtPayload = JSON.parse(payloadBuffer.toString())
    return updatedJwtPayload['userId']
  }

  static verifyJwt(tokenBearer: string, _Exception: any = UnauthorizedException) {
    if (!tokenBearer) {
      throw new _Exception({
        message: { message: 'Token must be not empty', statusCode: 401 },
      })
    }
    if (
      !tokenBearer.toString().startsWith('Bearer ') &&
      !tokenBearer.toString().startsWith('bearer ')
    ) {
      throw new _Exception({
        message: { message: 'Token invalid', statusCode: 401 },
      })
    }
    const token = tokenBearer.toString().substring('Bearer '.length)
    const base64Payload = token.split('.')[1]
    const payloadBuffer = Buffer.from(base64Payload, 'base64')
    const updatedJwtPayload = JSON.parse(payloadBuffer.toString())

    if (updatedJwtPayload['type'] && updatedJwtPayload['type'] != 'token') {
      throw new _Exception({
        message: {
          message: 'This token is invalid because type of token must be token',
          statusCode: 401,
        },
      })
    }
    JwtAuthGuard.checkExpire(token)
  }

  static checkExpire(token: string, _Exception: any = UnauthorizedException) {
    const base64Payload = token.split('.')[1]
    const payloadBuffer = Buffer.from(base64Payload, 'base64')
    const updatedJwtPayload = JSON.parse(payloadBuffer.toString())
    if (new Date().getTime() / 1000 > updatedJwtPayload['exp']) {
      throw new _Exception({
        message: { message: 'Token expire', statusCode: 401 },
      })
    }
  }
}
