import { Controller, Get } from '@nestjs/common'
import { succ } from '@libs/common/utils/resHelper'
import { AccountService } from './account.service'

@Controller()
export class BaseController {
  constructor (
    private readonly AccountService: AccountService,
  ) {}

  @Get('sysinfo')
  index () {
    return succ()
  }
}
