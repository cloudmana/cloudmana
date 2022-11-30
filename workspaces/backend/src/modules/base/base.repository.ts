/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Repository } from 'typeorm'
import { EventEmitter } from 'events'

export class BaseRepository<T extends Document> extends EventEmitter {
  protected primaryKey = '_id'

  constructor(protected readonly repository: Repository<T>) {
    super()
    this.repository = repository
  }
}
