/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { applyDecorators } from '@nestjs/common'
import { ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm'
import config from 'src/common/config'
import { DATABASE_CLIENT } from 'src/common/constants'

export const PrimaryColumn = (args?: any) => {
  if (config.database.client === DATABASE_CLIENT.MONGODB) {
    return applyDecorators(ObjectIdColumn({ primary: true, type: 'varchar', ...args }))
  }
  return applyDecorators(PrimaryGeneratedColumn(args))
}
