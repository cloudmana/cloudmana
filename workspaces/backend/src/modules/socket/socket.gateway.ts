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
} from '@nestjs/websockets'
import { ApiBearerAuth } from '@nestjs/swagger'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { SocketService } from './socket.service'

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly socketService: SocketService,
    @InjectPinoLogger(SocketGateway.name)
    private readonly logger: PinoLogger,
  ) {}

  async afterInit(server: any) {
    this.logger.info(`WebSocket running on path: ${server.path()}`)
  }

  @ApiBearerAuth()
  async handleConnection(client: any, req: Request) {
    const { user } = req as any
    try {
      // Set userId
      client.userId = user?.id || user?._id

      if (!this.socketService.connectedSockets[client.userId]) {
        this.socketService.connectedSockets[client.userId] = []
      }

      this.socketService.connectedSockets[client.userId].push(client)
      this.logger.info('User connected!', client.userId)
    } catch (error) {
      this.logger.warn('User auth failed!')
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
