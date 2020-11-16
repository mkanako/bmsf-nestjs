import { Module } from '@nestjs/common'
import { ConfigModule } from '@common/config'
import { DatabaseModule } from '@common/database'
import { AuthModule, AuthGuard } from './auth'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AccountService } from './account.service'
import { AttachmentModule } from './attachment/attachment.module'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    DatabaseModule.forFeature(['AdminAccount']),
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