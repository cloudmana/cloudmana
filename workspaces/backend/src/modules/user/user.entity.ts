/**
 * @since 2022/11/30
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import { Column, Entity, Unique } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseEntity } from '../base/base.entity'

@Entity({ name: 'users' })
export class User extends BaseEntity<User> {
  @Unique(['email'])
  @Column()
  email: string

  @Column()
  @Unique(['username'])
  username: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Exclude()
  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
