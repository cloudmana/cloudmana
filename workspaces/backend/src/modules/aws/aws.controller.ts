import { Controller, Get } from '@nestjs/common'
import { AwsService } from './aws.service'

@Controller('aws')
export class AwsController {
  constructor(private readonly service: AwsService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
