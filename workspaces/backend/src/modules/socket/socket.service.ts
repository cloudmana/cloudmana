/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { RedisService } from '../_shared/services/redis.service'
import { RedisClientType } from 'redis'
import config from 'src/common/config'

@Injectable()
export class SocketService implements OnModuleInit, OnModuleDestroy {
  public pubClient: RedisClientType
  public subClient: RedisClientType
  public connectedSockets: { [key: string]: any[] } = {}
  private discoveryInterval
  private serviceId: string

  constructor(
    private redisService: RedisService,
    @InjectPinoLogger(SocketService.name)
    private readonly logger: PinoLogger,
  ) {
    this.serviceId = 'SOCKET_CHANNEL_' + Math.random().toString(26).slice(2)

    if (config.redisConfig.enable) {
      setInterval(() => {
        this.sendMessage(
          'user1',
          new Date().toLocaleTimeString() + ` | from server on port ${process.env['PORT']}`,
          false,
        )
      }, 3000)
    }
  }

  async onModuleInit() {
    if (config.redisConfig.enable) {
      this.pubClient = this.redisService.newRedisClient() as RedisClientType
      this.subClient = (await this.redisService.newRedisClient()) as RedisClientType
      await this.pubClient.connect()
      await this.subClient.connect()

      this.subClient.subscribe(this.serviceId, (message) => {
        const { walletAddress, payload } = JSON.parse(message)
        this.sendMessage(walletAddress, payload, true)
      })

      await this.channelDiscovery()
    }
  }

  async onModuleDestroy() {
    this.discoveryInterval && clearTimeout(this.discoveryInterval)
  }

  private async channelDiscovery() {
    await this.redisService.setex(this.serviceId, 3, Date.now().toString())
    this.discoveryInterval = setTimeout(() => {
      this.channelDiscovery()
    }, 2000)
  }

  async sendMessage(walletAddress: string, payload: string | any, fromRedisChannel?: boolean) {
    if (typeof payload !== 'string') {
      payload = JSON.stringify(payload)
    }
    this.connectedSockets[walletAddress]?.forEach((socket) => socket.send(payload))
    if (config.redisConfig.enable && !fromRedisChannel) {
      this.redisService.keys('SOCKET_CHANNEL_*', (err, ids) => {
        ids
          .filter((p) => p != this.serviceId)
          .forEach((id) => {
            this.pubClient.publish(
              id,
              JSON.stringify({
                payload,
                walletAddress,
              }),
            )
          })
      })
    }
  }

  async sendMessageToMulti(
    walletAddresses: string[],
    payload: string | any,
    fromRedisChannel?: boolean,
  ) {
    walletAddresses.map((e: string) => {
      this.sendMessage(e, payload, fromRedisChannel)
    })
  }

  async sendMessageToAll(payload: string | any, fromRedisChannel?: boolean) {
    const walletAddresses = Object.keys(this.connectedSockets)
    walletAddresses.map((e: string) => {
      this.sendMessage(e, payload, fromRedisChannel)
    })
  }
}
