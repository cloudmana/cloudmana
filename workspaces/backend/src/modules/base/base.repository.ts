/**
 * @since 2022/11/29
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'
import { TypeormAdapter } from 'src/modules/_shared/databases/typeorm.adapter'
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate'
import { TypeOrmModuleHelper } from '../_shared/databases/typeorm.helper'

export class BaseRepository<T> extends Repository<T> {
  private readonly adapter = new TypeormAdapter()

  constructor(protected readonly repository: Repository<T>) {
    super(repository.target, repository.manager, repository.queryRunner)
    this.repository = repository
  }

  find(options?: FindManyOptions) {
    const opts = this.adapter.buildQuery(options)
    return this.repository.find(opts)
  }

  findOne(options?: FindOneOptions) {
    const opts = this.adapter.buildQuery(options)
    return this.repository.findOne(opts)
  }

  async paginate(query: FindOptionsWhere<T>, options: IPaginationOptions): Promise<Pagination<T>> {
    return paginate<T>(this.repository, options, query)
  }
}
