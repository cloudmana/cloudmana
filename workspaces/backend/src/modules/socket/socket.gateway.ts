/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Request } from 'express'
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard'
import { SocketService } from './socket.service'

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly jwtAuthGuardService: JwtAuthGuard,
    private readonly socketService: SocketService,
    @InjectPinoLogger(SocketGateway.name)
    private readonly logger: PinoLogger,
  ) {}

  async afterInit(server: any) {
    this.logger.info(`WebSocket running on path: ${server.path()}`)
  }

  async handleConnection(client: any, req: Request) {
    const token: string = req.headers['authorization'] as string
    try {
      JwtAuthGuard.verifyJwt(token, WsException)

      // Set userId
      client.userId = this.jwtAuthGuardService.getUserId(token)

      if (!this.socketService.connectedSockets[client.userId]) {
        this.socketService.connectedSockets[client.userId] = []
      }

      this.socketService.connectedSockets[client.userId].push(client)
      this.logger.info('User connected!', client.userId)
    } catch (error) {
      this.logger.warn('User auth failed!', token)
      client.close(4403, error.error?.message?.message || 'JWT authentication failed')
    }
  }

  handleDisconnect(client: any) {
    if (client.userId) {
      this.socketService.connectedSockets[client.userId] = this.socketService.connectedSockets[
        client.userId
      ]?.filter((p) => p.id !== client.id)
      this.logger.info('User disconnected!', client.userId)
    }
  }
}
