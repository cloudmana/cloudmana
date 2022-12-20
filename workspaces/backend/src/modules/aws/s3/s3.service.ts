import { Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'

@Injectable()
export class S3Service {
  getHello(): string {
    return 'Hello World from AWS migrate!'
  }

  getBucketList(): any {
    const s3 = new S3({credentials: {
      accessKeyId: '',
      secretAccessKey: ''
    }})
    return s3.listBuckets()
  }
}
