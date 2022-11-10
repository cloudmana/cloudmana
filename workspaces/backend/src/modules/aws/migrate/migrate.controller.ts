import { Controller, Get } from '@nestjs/common'
import { MigrateService } from './migrate.service'

@Controller('aws/migrate')
export class MigrateController {
  constructor(private readonly service: MigrateService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
