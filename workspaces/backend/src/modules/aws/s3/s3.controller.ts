import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { S3Service } from './s3.service'

@Controller('aws/s3')
@ApiTags('aws/s3')
export class S3Controller {
  constructor(private readonly service: S3Service) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
