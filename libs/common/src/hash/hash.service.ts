import { Injectable, Inject } from '@nestjs/common'
import { HASH_HASHER } from './hash.constants'
import { Hasher } from './hasher.interface'

@Injectable()
export class HashService implements Hasher {
  make: Hasher['make']
  check: Hasher['check']

  constructor (@Inject(HASH_HASHER) private readonly hasher: Hasher) {
    ['check', 'make'].forEach((method) => {
      this[method as keyof Hasher] = this.hasher[method as keyof Hasher].bind(hasher) as any
    })
  }
}
