import { Controller, Get } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
import { succ } from '../respHelper'
import { AccountService } from '../services/account.service'
// import { CONFIGS_TYPE } from '@app/config'
// import { ConfigService } from '@/libs/config'

// type xx=CONFIGS_TYPE['database']
// interface DatabaseConfig {
//   host: string;
//   port: number;
// }

@Controller()
export class BaseController {
  constructor (
    // private readonly configService: ConfigService,
    private readonly userService: AccountService,
  ) {}

  @Get('sysinfo')
  index () {
    // CONFIGS_TYPE.
    // const q = 'database'
    // type ss = typeof q
    // const a = this.configService.get<CONFIGS_TYPE[ss]>('ss')
    // console.log(this.configService.getItem('database'))
    // throw new Error('s')

    // this.userService.up()
    // console.log(this.configService.getItem('database'))
    this.userService.findAll().then(a => {
      console.log(a)
    })

    return succ('xx')
  }
}
