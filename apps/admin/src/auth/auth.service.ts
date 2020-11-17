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

  generateToken (sub: number, username: string) {
    return 'Bearer ' + this.jwtService.sign({ sub, username })
  }

  authHeader (param: string|Payload) {
    let token
    if (typeof param === 'string') {
      token = param
    } else {
      token = this.generateToken(param.sub, param.username)
    }
    return { Authorization: token }
  }

  async validate (username: string, password: string) {
    const user = await this.accountService.findOne(username)
    if (user && this.hashService.check(password, user.password)) {
      return this.generateToken(user.id, user.username)
    }
    return false
  }
}
