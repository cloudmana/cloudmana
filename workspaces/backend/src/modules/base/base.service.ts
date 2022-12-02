/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { BaseEntity, DeleteResult, In, Repository, FindOptionsWhere } from 'typeorm'
import { IBaseService } from './interfaces/base.service.interface'
import { EntityId } from 'typeorm/repository/EntityId'

export class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  protected readonly repository: R

  constructor(repository: R) {
    this.repository = repository
  }

  index(): Promise<T[]> {
    return this.repository.find()
  }

  findById(id: any): Promise<T> {
    return this.repository.findOneBy(id)
  }

  findByIds(ids: any[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) } as FindOptionsWhere<any>)
  }

  store(data: any): Promise<T> {
    return this.repository.save(data)
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
