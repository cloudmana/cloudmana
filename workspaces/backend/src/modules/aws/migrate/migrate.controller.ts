import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MigrateService } from './migrate.service'

@Controller('aws/migrate')
@ApiTags('aws/migrate')
export class MigrateController {
  constructor(private readonly service: MigrateService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
