import { Module } from '@nestjs/common'
import { AttachmentController } from './attachment.controller'
import { AttachmentService } from './attachment.service'
import { HashModule, HashService } from '@common/hash'

@Module({
  imports: [
    HashModule, // .register('aaaa'),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
