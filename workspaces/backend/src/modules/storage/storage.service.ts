import { Injectable } from '@nestjs/common'

@Injectable()
export class StorageService {
  getHello(): string {
    return 'Hello World from AWS provider!'
  }

  getBucketList(): string {
    return 'Hello World from AWS provider!'
  }
}
