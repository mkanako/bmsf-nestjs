import { Module, DynamicModule } from '@nestjs/common'
import { HASH_HASHER } from './hash.constants'
import { BcryptHasher } from './bcrypt-hasher'
import { HashService } from './hash.service'

const algorithmList = {
  bcrypt: BcryptHasher,
}

type ALGO_TYPES = typeof algorithmList
type ALGO_TYPES_MAP = {
  [ALGO_NAME in keyof ALGO_TYPES]: [algoName: ALGO_NAME, options?:ConstructorParameters<ALGO_TYPES[ALGO_NAME]>[0]]
}

@Module({
  providers: [
    HashService,
    {
      provide: HASH_HASHER,
      useFactory: (algoName: keyof ALGO_TYPES = 'bcrypt') => {
        return new algorithmList[algoName]()
      },
    },
  ],
  exports: [HASH_HASHER, HashService],
})
export class HashModule {
  static register (...params: ALGO_TYPES_MAP[keyof ALGO_TYPES_MAP]): DynamicModule {
    const [algoName, options] = params
    return {
      module: HashModule,
      providers: [
        {
          provide: HASH_HASHER,
          useValue: new algorithmList[algoName](options),
        },
      ],
    }
  }
}
