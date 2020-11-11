import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdminAccount as Account } from '@libs/database/entities'

@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {
    // this.up()
    // this.create()
    // this.findAll().then(a => {
    //   console.log(a)
    // })
  }

  async create () {
    const user = new Account()
    user.username = 'xxs1' + (+new Date())
    user.password = 'sa'
    this.accountRepository.insert(user)
  }

  // as
  async up () {
    // const user = await this.accountRepository.findOne(12)
    // user.username = 'Umed'
    // await this.accountRepository.save(user)
    // return user
    this.accountRepository.update(2, { username: 'we' })
  }

  findAll (): Promise<Account[]> {
    return this.accountRepository.find()
  }

  findOne (id: string): Promise<Account|undefined> {
    return this.accountRepository.findOne(id)
  }

  async remove (id: string): Promise<void> {
    await this.accountRepository.delete(id)
  }
}
