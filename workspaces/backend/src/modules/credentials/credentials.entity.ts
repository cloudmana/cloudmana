/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IdColumn } from 'src/common/decorators/base.decorator'
import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import { Providers } from '../providers/providers.entity'
import { User } from '../user/user.entity'

@Entity({ name: 'credentials' })
@Unique(['accessKeyId', 'secretAccessKey', 'user', 'provider'])
export class Credentials extends BaseEntity<Credentials> {
  @Column()
  name: string

  @Column({ nullable: false })
  accessKeyId: string

  @Column({ nullable: false })
  secretAccessKey: string

  @IdColumn({ name: 'provider', nullable: false })
  @ManyToOne(() => Providers, (provider) => provider._id)
  provider: Providers

  @IdColumn({ name: 'user', nullable: false })
  @ManyToOne(() => User, (user) => user._id)
  user: User
}
