/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Injectable, OnModuleInit } from '@nestjs/common'
import config from 'src/common/config'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { Telegraf } from 'telegraf'

@Injectable()
export class TelegramService implements OnModuleInit {
  private token = ''
  public bot

  constructor(
    @InjectPinoLogger(TelegramService.name)
    private readonly logger: PinoLogger,
  ) {
    if (!config.getBoolean('services.telegram.enable')) {
      return
    }
    this.token = config.get('secrets.telegram.apiToken')
    this.bot = new Telegraf(this.token)
  }

  onModuleInit() {
    if (!config.getBoolean('services.telegram.enable')) {
      return
    }
    this.logger.info('Telegram initialization...')

    this.bot.on('text', (ctx) => {
      this.logger.info(ctx.update.message.from.id)
      ctx.reply(
        'id ' + ctx.update.message.from.id + ' username ' + ctx.update.message.from.username,
      )
    })
    this.bot.launch()
  }

  sendMessage(chatId: string | number = config.get('secrets.telegram.uid'), message: string): void {
    this.bot.telegram.sendMessage(chatId, message)
  }
}
