/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { EntityId } from 'typeorm/repository/EntityId'
import { DeleteResult } from 'typeorm'

export interface IBaseService<T> {
  index(): Promise<T[]>
  findById(id: EntityId): Promise<T>
  findByIds(id: [EntityId]): Promise<T[]>
  store(data: any): Promise<T>
  update(id: EntityId, data: any): Promise<T>
  delete(id: EntityId): Promise<DeleteResult>
}
