import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AccountEntity as User } from '../entities/account.entity'

@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // this.up()
    // this.create()
    // this.findAll().then(a => {
    //   console.log(a)
    // })
  }

  async create () {
    const user = new User()
    user.username = 'xxs1' + (+new Date())
    user.password = 'sa'
    this.userRepository.insert(user)
  }

  // as
  async up () {
    // const user = await this.userRepository.findOne(12)
    // user.username = 'Umed'
    // await this.userRepository.save(user)
    // return user
    this.userRepository.update(2, { username: 'we' })
  }

  findAll (): Promise<User[]> {
    return this.userRepository.find()
  }

  findOne (id: string): Promise<User|undefined> {
    return this.userRepository.findOne(id)
  }

  async remove (id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
