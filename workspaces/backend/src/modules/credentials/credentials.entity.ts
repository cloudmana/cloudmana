/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { IdColumn } from 'src/common/decorators/base.decorator'
import { Column, Entity, Unique } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import { EntityIdType } from 'src/common/types/entity.type'

@Entity({ name: 'credentials' })
@Unique(['accessKeyId', 'secretAccessKey', 'userId', 'providerId'])
export class Credentials extends BaseEntity<Credentials> {
  @Column()
  name: string

  @Column({ nullable: false })
  accessKeyId: string

  @Column({ nullable: false })
  secretAccessKey: string

  @IdColumn({ name: 'providerId', nullable: false })
  providerId: EntityIdType

  @IdColumn({ name: 'userId', nullable: false })
  userId: EntityIdType
}
