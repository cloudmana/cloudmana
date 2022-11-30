import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { SocketGateway } from './socket.gateway'

@Module({
  imports: [],
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class SocketModule {}
