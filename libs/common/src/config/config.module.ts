import { Module, Global } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigService } from './config.service'
import { configData } from './config-data'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({ load: configData }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
