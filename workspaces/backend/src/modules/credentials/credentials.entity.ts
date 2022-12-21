/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Column, Entity, Unique } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import { ObjectId } from 'mongodb'

@Entity({ name: 'credentials' })
@Unique(['accessKeyId', 'secretAccessKey', 'userId', 'providerId'])
export class Credentials extends BaseEntity<Credentials> {
  @Column()
  name: string

  @Column({ nullable: false })
  accessKeyId: string

  @Column({ nullable: false })
  secretAccessKey: string

  @Column({ nullable: false })
  providerId: number | ObjectId

  @Column({ nullable: false })
  userId: number | ObjectId
}
