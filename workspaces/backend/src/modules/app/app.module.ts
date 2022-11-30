/**
 * @since 2022/11/10
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Module, CacheModule } from '@nestjs/common'
import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { LoggerModule } from 'nestjs-pino'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { TypeOrmModuleConfigService } from 'src/shared/databases/typeorm.helper'
import { SharedModule } from 'src/shared/shared.module'
import { loggerConfig } from '../../shared/logger.helper'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { SocketModule } from '../socket/socket.module'
import { UserModule } from '../user/user.module'
import config from 'src/common/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import AnyExceptionFilter from 'src/common/filters/any-exception.filter'
import { BaseTransferInterceptor } from '../interceptors/response.interceptor'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () =>
        loggerConfig(process.env.NODE_ENV || config.nodeEnv, config.logger.autoLogging),
    }),
    EventEmitterModule.forRoot(),
    CacheModule.register(config.redisConfig),
    DiscoveryModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmModuleConfigService }),
    SharedModule,
    AuthModule,
    SocketModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseTransferInterceptor,
    },
  ],
})
export class AppModule {}
