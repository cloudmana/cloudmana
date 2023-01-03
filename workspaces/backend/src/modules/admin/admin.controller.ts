import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AdminService } from './admin.service'

@Controller('admin')
@ApiTags('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
