import * as bcrypt from 'bcrypt'
import { Hasher } from './hasher.interface'

interface BcryptOptions {
  rounds?: number
}

export class BcryptHasher implements Hasher {
  private rounds = 10

  constructor (options?: BcryptOptions) {
    if (options && options.rounds) {
      this.rounds = options.rounds
    }
  }

  make (value: string) {
    const salt = bcrypt.genSaltSync(this.rounds)
    return bcrypt.hashSync(value, salt)
  }

  check (value: string, hashedValue: string) {
    return bcrypt.compareSync(value, hashedValue.replace(/^\$2y/, '$2a'))
  }
}
