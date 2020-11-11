import { Module } from '@nestjs/common'
import { ConfigModule } from '@libs/config'
import { DatabaseModule } from '@libs/database'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BaseModule } from './base/base.module'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    BaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
