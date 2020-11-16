import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminAccount as Account } from '@entities'
import { Request } from './auth/interfaces'

@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(Account) private account: Repository<Account>,
  ) { }

  async findOne (username: string) {
    return await this.account.findOne({
      select: ['id', 'username', 'password'],
      where: { username },
    })
  }

  async getByPayload (payload: any) {
    if (payload?.sub && typeof payload.sub === 'number') {
      const { sub: id, username } = payload
      let user
      if (username) {
        user = this.account.create({ id, username }) as any as Request['user']
      } else {
        user = await this.account.findOne({
          select: ['id', 'username'],
          where: { id },
        }) as any as Request['user']
      }
      if (user) {
        Object.assign(user, { payload })
      }
      return user
    }
  }
}
