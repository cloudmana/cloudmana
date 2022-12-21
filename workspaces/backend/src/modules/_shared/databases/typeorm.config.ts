/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import config from 'src/common/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { TypeormLogger } from 'src/helpers/logger.helper'

export class TypeOrmModuleConfig implements TypeOrmOptionsFactory {
  constructor(
    @InjectPinoLogger(TypeOrmModuleConfig.name)
    private readonly logger: PinoLogger,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const dbConfig = config.database
    this.logger.info(`Using database type ${dbConfig.client}`)
    return {
      useNewUrlParser: true,
      type: dbConfig.client as any,
      database: dbConfig.database,
      url: dbConfig.uri,
      synchronize: true,
      autoLoadEntities: true,
      logging: config.nodeEnv !== 'production',
      logger: new TypeormLogger(),
    }
  }
}
