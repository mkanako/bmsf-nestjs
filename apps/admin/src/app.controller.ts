import { Controller, Get, Post, Req, Body } from '@nestjs/common'
import { Request, Response } from 'express'
import { succ, err } from '@common/utils/resHelper'
import { excludeGuard } from '@common/decorators/exclude-guard.decorator'
import { Res } from '@common/decorators/res.decorator'
import { AccountService } from './account.service'
import { AuthService } from './auth'
import { LoginDto } from './app.dto'

@Controller()
export class AppController {
  constructor (
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  private getSysInfo () {
    return {
      attachmentUrl: '/',
      routeList: ['*'],
    }
  }

  @Get('sysInfo')
  sysInfo (@Req() req: Request) {
    console.log(req.user)
    return succ(this.getSysInfo())
  }

  @excludeGuard()
  @Post('login')
  async login (@Body() param: LoginDto, @Res() res: Response) {
    const token = await this.authService.validate(param.username, param.password)
    if (token) {
      res.set(this.authService.authHeader(token))
      return succ(this.getSysInfo())
    }
    return err('username or password is incorrect')
  }

  @excludeGuard()
  @Post('logout')
  logout () {
    return succ()
  }
}
