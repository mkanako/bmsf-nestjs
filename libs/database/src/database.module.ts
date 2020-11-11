import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@libs/config'
import { DatabaseService } from './database.service'
import * as entities from './entities'

type ENTITIES_TYPE = keyof typeof entities

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
  static forFeature (entity: ENTITIES_TYPE|ENTITIES_TYPE[]) {
    const EntitiesSchema = Array.isArray(entity) ? entity : [entity]
    return TypeOrmModule.forFeature(EntitiesSchema.map(item => entities[item]))
  }
}
