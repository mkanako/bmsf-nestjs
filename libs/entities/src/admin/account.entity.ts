import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer'
import { CreateTimestampColumn, UpdateTimestampColumn } from '@common/decorators/typeorm-timestamp-column'

@Entity('admin_users')
export class AdminAccount {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 30,
    unique: true,
  })
  username: string

  @Exclude()
  @Column({ length: 60 })
  password: string

  @CreateTimestampColumn()
  createdAt: Date

  @UpdateTimestampColumn()
  updatedAt: Date
}
