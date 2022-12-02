/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }

  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder().where('isActive = :active', { active: false }).getMany()
  }
}
