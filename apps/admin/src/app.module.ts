import { Module } from '@nestjs/common'
import { ConfigModule } from '@common/config'
import { DatabaseModule } from '@common/database'
import { HashModule } from '@common/hash'
import { AuthModule, AuthGuard } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AccountService } from './account.service'
import { AttachmentModule } from './attachment/attachment.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule.forRoot(['AdminAccount', 'AdminAttachment']),
    HashModule,
    AuthModule,
    AttachmentModule,
  ],
  controllers: [AppController],
  providers: [
    AccountService,
    AppService,
    AuthGuard,
  ],
})
export class AppModule {}
