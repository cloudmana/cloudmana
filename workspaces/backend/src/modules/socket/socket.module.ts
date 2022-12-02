/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Module } from '@nestjs/common'
import { SocketService } from './socket.service'
import { SocketGateway } from './socket.gateway'

@Module({
  imports: [],
  providers: [SocketService, SocketGateway],
  exports: [SocketService],
})
export class SocketModule {}
