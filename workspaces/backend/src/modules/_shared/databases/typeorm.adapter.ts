/**
 * @since 2022/12/08
 * @author ThinhHV <thinh@thinhhv.com>
 * @description Adapter to compatible with database types
 * @copyright (c) 2022 Cloudmana Platform
 */

import config from 'src/common/config'
import { DATABASE_CLIENT } from 'src/common/constants'
import { FindOptionsSelect, FindOptionsWhere } from 'typeorm'

// TODO: WIP / sketch
export class TypeormAdapter<T> {
  query: any = {}

  buildQuery(query: any) {
    this.query = query
    this.where().select()
    return this.query
  }
  where(where: FindOptionsWhere<T> & { $or: any } = this.query.where) {
    if (where && where.$or) {
      this.query.where = $or(where)
    }
    return this
  }
  select(_select: FindOptionsSelect<T> = this.query.select) {
    // TODO: implement this function
    return this
  }
}

const $or: any = (query: any[] & { $or?: { [key: string]: any }[] }) => {
  switch (config.database.client) {
    case DATABASE_CLIENT.MONGODB:
      return query
    default:
      return query.$or
  }
}
