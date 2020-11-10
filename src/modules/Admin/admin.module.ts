import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseController } from './controllers/base.controller'
import { setModulePrefix } from '@/decorators/set-module-prefix'
import { AccountEntity } from './entities/account.entity'
import { AccountService } from './services/account.service'

@setModulePrefix('admin')
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
    ]),
  ],
  controllers: [
    BaseController,
  ],
  providers: [
    AccountService,
  ],
})
export class AdminModule {}
