/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Providers } from './providers.entity'
import { BaseRepository } from '../base/base.repository'

@Injectable()
export class ProvidersRepository extends BaseRepository<Providers> {
  constructor(
    @InjectRepository(Providers)
    repository: Repository<Providers>,
  ) {
    super(repository)
  }
}
