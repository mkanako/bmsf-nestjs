import { ExecutionContext, Injectable, Inject } from '@nestjs/common'
import { AuthGuard as NestAuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import ms from 'ms'
import { ConfigService } from '@common/config'
import { EXCLUDE_GUARD } from '@common/decorators/exclude-guard.decorator'
import { AuthException, AuthService } from '.'
import { Request } from './interfaces'

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  @Inject() private readonly reflector: Reflector
  @Inject() private readonly configService: ConfigService
  @Inject() private readonly authService: AuthService

  async canActivate (context: ExecutionContext) {
    const isExclude = this.reflector.get<boolean|undefined>(EXCLUDE_GUARD, context.getHandler())
    if (isExclude) {
      return true
    }
    const isCan = await super.canActivate(context) as boolean
    if (isCan) {
      const req = context.switchToHttp().getRequest<Request>()
      const res = context.switchToHttp().getResponse<Response>()
      const payload = req?.user?.payload
      if (payload && payload.exp) {
        const ttl = ms(this.configService.getItem('jwt').exp)
        if (ttl > 0 && payload.exp * 1000 - (new Date()).getTime() < ttl * 0.1) {
          res.set(this.authService.authHeader(payload))
        }
      }
    }
    return isCan
  }

  handleRequest (err: any, user: any, info: any) {
    if (err) {
      throw err
    }
    if (info) {
      throw new AuthException(info.message)
    }
    if (user) {
      return user
    }
    throw new AuthException('user not exist')
  }
}
