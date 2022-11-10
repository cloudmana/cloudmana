import { Injectable } from '@nestjs/common'

@Injectable()
export class MigrateService {
  getHello(): string {
    return 'Hello World from AWS migrate!'
  }
}
