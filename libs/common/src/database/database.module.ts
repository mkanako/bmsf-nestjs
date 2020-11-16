import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@common/config'
import { DatabaseService } from './database.service'
import * as entities from '@entities'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.getItem('database'),
        retryAttempts: configService.getItem('app').isProd ? 3 : 1,
        autoLoadEntities: true,
        dropSchema: false,
        synchronize: false,
        logging: true,
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  static forFeature (entityKeys: (keyof typeof entities)[]) {
    return Object.assign(
      TypeOrmModule.forFeature(entityKeys.map(item => entities[item])),
      { global: true },
    )
  }
}
