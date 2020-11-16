import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HashService } from '@common/hash'
import { AdminAccount as Account } from '@entities'
import { Request } from './auth/interfaces'

@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(Account) private account: Repository<Account>,
    private readonly hashService: HashService,
  ) { }

  async findOne (username: string) {
    return await this.account.findOne({
      select: ['id', 'username', 'password'],
      where: { username },
    })
  }

  async changePassword (id: number, username: string, password: string) {
    const result = await this.account.update({ id, username }, { password: this.hashService.make(password) })
    if (result.affected) {
      return result.affected > 0
    }
    return false
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
