import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AwsService } from './aws.service'

@Controller('aws')
@ApiTags('aws')
export class AwsController {
  constructor(private readonly service: AwsService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
