/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { User } from 'src/modules/user/user.entity'
import { UserRepository } from './user.repository'
import { BaseService } from '../../base/base.service'

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    repository: UserRepository,
    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repository)
  }

  // findByEmail(email: string): Promise<User | null> {
  //   return this.repository.findOne({ email: email })
  // }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers()
  }
}
