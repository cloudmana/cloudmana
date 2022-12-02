import {
  BaseEntity as _BaseEntity,
  CreateDateColumn,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ObjectId } from 'mongodb'

export class BaseEntity<T> extends _BaseEntity {
  constructor(partial?: Partial<T>) {
    super()
    Object.assign(this, partial || {})
  }

  @ObjectIdColumn({ type: 'varchar' })
  _id: ObjectId

  @PrimaryGeneratedColumn()
  id: number

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
