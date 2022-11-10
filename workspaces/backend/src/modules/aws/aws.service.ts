import { Injectable } from '@nestjs/common'

@Injectable()
export class AwsService {
  getHello(): string {
    return 'Hello World from AWS provider!'
  }
}
