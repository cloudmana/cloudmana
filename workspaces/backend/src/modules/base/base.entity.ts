import {
  BaseEntity as _BaseEntity,
  CreateDateColumn,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseEntity<T> extends _BaseEntity {
  constructor(partial: Partial<T>) {
    super()
    Object.assign(this, partial)
  }

  @ObjectIdColumn()
  _id: string

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    default: 'now()',
    nullable: true,
  })
  createdAt: string

  @UpdateDateColumn({
    default: 'now()',
    nullable: true,
  })
  updatedAt: string
}
