import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PaginationDto } from 'src/common/dto/pagination.dto'
import { Providers } from './providers.entity'
import { ProvidersService } from './providers.service'

@Controller('providers')
@ApiTags('providers')
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get()
  async getAllProviders(@Query() params: PaginationDto): Promise<Pagination<Providers>> {
    return await this.service.getAllProviders(params)
  }
}
