import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { LocalStoragerModule } from '@common/storagers'
import { AttachmentController } from './attachment.controller'
import { AttachmentService } from './attachment.service'

@Module({
  imports: [
    LocalStoragerModule,
    ServeStaticModule.forRoot({
      rootPath: './storage',
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
