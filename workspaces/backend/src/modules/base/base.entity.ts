import {
  BaseEntity as _BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn as _PrimaryColumn,
} from 'typeorm'
import { PrimaryColumn } from '../../common/decorators/base.decorator'
import { EntityIdType } from 'src/common/types/entity.type'

export class BaseEntity<T> extends _BaseEntity {
  constructor(partial?: Partial<T>) {
    super()
    Object.assign(this, partial || {})
  }

  @PrimaryColumn()
  _id: EntityIdType

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
