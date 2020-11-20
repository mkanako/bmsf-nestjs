import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer'
import { CreateTimestampColumn, UpdateTimestampColumn } from '@common/decorators/typeorm-timestamp-column'

@Entity('admin_attachments')
export class AdminAttachment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255 })
  filename: string

  @Column({ length: 255 })
  path: string

  @Column({ length: 20 })
  type: string

  @Exclude()
  @Column({
    default: 0,
    unsigned: true,
  })
  uid: number

  @Exclude()
  @CreateTimestampColumn()
  createdAt: Date

  @Exclude()
  @UpdateTimestampColumn()
  updatedAt: Date
}
