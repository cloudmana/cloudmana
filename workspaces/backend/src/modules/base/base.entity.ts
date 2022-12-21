import {
  BaseEntity as _BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn as _PrimaryColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'
import { PrimaryColumn } from './decorator/base.decorator'

export class BaseEntity<T> extends _BaseEntity {
  constructor(partial?: Partial<T>) {
    super()
    Object.assign(this, partial || {})
  }

  @PrimaryColumn()
  _id: number | ObjectId

  @CreateDateColumn({
    default: new Date().toISOString(),
    nullable: true,
  })
  createdAt: Date

  @UpdateDateColumn({
    default: new Date().toISOString(),
    nullable: true,
  })
  updatedAt: Date
}
