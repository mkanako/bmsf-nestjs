import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { CreateTimestampColumn, UpdateTimestampColumn } from '@libs/common/decorators/typeorm-timestamp-column'

@Entity('admin_attachments')
export class AdminAttachment {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 255 })
  filename!: string

  @Column({ length: 255 })
  path!: string

  @Column({ length: 20 })
  type!: string

  @Column({
    default: 0,
    unsigned: true,
  })
  uid!: number

  @CreateTimestampColumn()
  createdAt!: Date

  @UpdateTimestampColumn()
  updatedAt!: Date
}
