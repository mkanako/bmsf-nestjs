import { Module } from '@nestjs/common'
import { DatabaseModule } from '@libs/database'
import { BaseController } from './base.controller'
import { AccountService } from './account.service'

@Module({
  imports: [
    DatabaseModule.forFeature([
      'AdminAccount',
    ]),
  ],
  controllers: [
    BaseController,
  ],
  providers: [
    AccountService,
  ],
})
export class BaseModule {}
