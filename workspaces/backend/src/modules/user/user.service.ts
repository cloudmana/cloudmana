import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { Injectable } from '@nestjs/common'
import { BaseService } from '../base/base.service'

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(repository: UserRepository) {
    super(repository)
  }

  // findByEmail(email: string): Promise<User | null> {
  //   return this.repository.findOne({ email: email })
  // }

  getInactiveUsers(): Promise<User[]> {
    this.logger.info('test')
    return this.repository.getInactiveUsers()
  }
}
