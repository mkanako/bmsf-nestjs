import { Module, DynamicModule } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces'
import { ConfigService } from './config.service'
import { configData } from './config-data'

@Module({})
export class ConfigModule {
  static forRoot (options: ConfigModuleOptions = {}): DynamicModule {
    if (!options.load) {
      options.load = configData
    }
    return {
      global: true,
      module: ConfigModule,
      imports: [NestConfigModule.forRoot(options)],
      providers: [ConfigService],
      exports: [ConfigService],
    }
  }
}
