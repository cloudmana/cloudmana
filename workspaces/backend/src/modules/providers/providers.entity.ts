/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../base/base.entity'

@Entity({ name: 'providers' })
export class Providers extends BaseEntity<Providers> {
  @Column()
  name: string

  @Column()
  shortName: string

  @Column()
  description: string
}
