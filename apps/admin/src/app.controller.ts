import { Controller, Get, Post, Req, Body } from '@nestjs/common'
import { Response } from 'express'
import { succ, err } from '@common/utils/resHelper'
import { excludeGuard } from '@common/decorators/exclude-guard.decorator'
import { Res } from '@common/decorators/res.decorator'
import { StoragerService } from '@common/storagers'
import { AccountService } from './account.service'
import { AuthService } from './auth'
import { Request } from './auth/interfaces'
import { LoginDto, ChangePasswordDto } from './app.dto'

@Controller()
export class AppController {
  constructor (
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly storagerService: StoragerService,
  ) {}

  private getSysInfo () {
    return {
      attachmentUrl: this.storagerService.getUrl(),
      routeList: ['*'],
    }
  }

  @Get('sysInfo')
  sysInfo (@Req() req: Request) {
    console.log(req.user)
    return succ(this.getSysInfo())
  }

  @Post('changePassword')
  async changePassword (@Body() param: ChangePasswordDto, @Req() req: Request) {
    return succ(await this.accountService.changePassword(req.user.id, req.user.username, param.password))
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
  @Get('logout')
  logout () {
    return succ()
  }
}
