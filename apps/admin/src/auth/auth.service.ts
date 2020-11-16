import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HashService } from '@common/hash'
import { AccountService } from '../account.service'
import { Payload } from './interfaces'

@Injectable()
export class AuthService {
  constructor (
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly accountService: AccountService,
  ) {}

  generateToken (payload: Payload) {
    return 'Bearer ' + this.jwtService.sign(payload)
  }

  authHeader (param: string|Payload) {
    let token
    if (typeof param === 'string') {
      token = param
    } else {
      token = this.generateToken(param)
    }
    return { Authorization: token }
  }

  async validate (username: string, password: string) {
    const user = await this.accountService.findOne(username)
    if (user && this.hashService.check(password, user.password)) {
      const payload = {
        sub: user.id,
        username: user.username,
      }
      return this.generateToken(payload)
    }
    return false
  }
}
