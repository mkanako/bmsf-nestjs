import { Controller, Get, Inject } from '@nestjs/common'
import { succ } from '@common/utils/resHelper'
import { Hasher, HASH_HASHER, HashService } from '@common/hash'
import { ConfigService } from '@common/config'

@Controller('attachment')
export class AttachmentController {
  constructor (
    private configService: ConfigService,
    private hasher: HashService,
    // @Inject(HASH_HASHER) private readonly hasher: Hasher,
  ) {}

  @Get()
  index () {
    this.hasher.make('sa')
    return succ()
  }
}
