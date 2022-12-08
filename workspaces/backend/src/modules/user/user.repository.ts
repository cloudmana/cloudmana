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
import { BaseRepository } from '../base/base.repository'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository)
  }

  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder().where('isActive = :active', { active: false }).getMany()
  }
}
