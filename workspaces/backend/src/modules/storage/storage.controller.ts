import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { StorageService } from './storage.service'

@Controller('storage')
@ApiTags('storage')
export class StorageController {
  constructor(private readonly service: StorageService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }

  @Get('bucket')
  getBucketList(): string {
    return this.service.getBucketList()
  }
}
