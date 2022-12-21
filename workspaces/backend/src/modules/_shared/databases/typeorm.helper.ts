/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import config from 'src/common/config'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { ObjectId } from 'mongodb'
import { DATABASE_CLIENT } from 'src/common/constants'
import { BadRequestException } from '@nestjs/common'

export class TypeOrmModuleHelper {
  constructor(
    @InjectPinoLogger(TypeOrmModuleHelper.name)
    private readonly logger: PinoLogger,
  ) {}

  static transformCollectionId(_id: number | string | ObjectId): number | ObjectId | any {
    if (config.database.client === DATABASE_CLIENT.MONGODB) {
      if (_id instanceof ObjectId) return _id
      try {
        return new ObjectId(_id)
      } catch (_) {
        throw new BadRequestException('ID not in format ObjectId')
      }
    }
    return parseInt(_id.toString())
  }

  static convertCollectionId(_id: number | string | ObjectId): any {
    if (config.database.client === DATABASE_CLIENT.MONGODB) {
      if (_id instanceof ObjectId) return _id
      try {
        return new ObjectId(_id)
      } catch (_) { /* empty */ }
    }
    return _id
  }

  static transformObjectId(obj: any) {
    if (typeof obj !== 'object') return this.convertCollectionId(obj)
    const output = obj
    Object.keys(obj).map((k) => {
      output[k] = this.transformObjectId(obj[k])
    })
    return output
  }
}
