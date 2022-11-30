import { DataSource, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }

  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder().where('isActive = :active', { active: false }).getMany()
  }
}
