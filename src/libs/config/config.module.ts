import { Module, Global } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigService } from './config.service'
import { configs } from './configs'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({ load: configs }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
