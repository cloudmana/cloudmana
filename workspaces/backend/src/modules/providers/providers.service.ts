import { Injectable } from '@nestjs/common'
import { Timeout } from '@nestjs/schedule'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { BaseService } from '../base/base.service'
import { Providers } from './providers.entity'
import { ProvidersRepository } from './providers.repository'
import { PROVIDERS } from 'src/common/config/master-data/providers'
import { Pagination } from 'nestjs-typeorm-paginate'

@Injectable()
export class ProvidersService extends BaseService<Providers, ProvidersRepository> {
  constructor(
    repository: ProvidersRepository,
    @InjectPinoLogger(ProvidersService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repository)
  }

  async getAllProviders(params): Promise<Pagination<Providers>> {
    const { page, limit } = params
    return await this.repository.paginate({}, { page, limit })
  }

  @Timeout(500)
  async initDbProviders() {
    const result = await this.repository.find({})
    const totalFilled = result.length
    const total = PROVIDERS.length

    if (totalFilled >= total) return

    let fill = PROVIDERS
    // fill missing providers
    if (totalFilled > 0) {
      const providers = result.map((e) => e.name)
      fill = PROVIDERS.filter((e) => !providers.includes(e.name))
      this.logger.info(`Auto fill missing providers ${JSON.stringify(fill.map((e) => e.name))}`)
    } else {
      this.logger.info('Auto fill providers')
    }
    for (const item of fill) {
      await this.repository.save({
        ...item,
      })
    }
    return
  }
}
