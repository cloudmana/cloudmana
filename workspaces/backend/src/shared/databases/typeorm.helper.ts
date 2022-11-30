/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import config from 'src/common/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

export class TypeOrmModuleConfigService implements TypeOrmOptionsFactory {
  constructor(
    @InjectPinoLogger(TypeOrmModuleConfigService.name)
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
    }
  }

  private static paginate(items, page = 1, perPage = 20) {
    const limit = Number(perPage)
    const offset = limit * (page - 1)
    const totalPages = Math.ceil(items.length / limit)
    const paginatedItems = items.slice(offset, limit * page)
    return {
      docs: paginatedItems,
      totalDocs: items.length,
      limit,
      totalPages: totalPages,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    }
  }
}
