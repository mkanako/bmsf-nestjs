import { Module, DynamicModule } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@common/config'
import * as entities from '@entities'

@Module({})
export class DatabaseModule {
  static forRoot (entities: Parameters<typeof DatabaseModule.forFeature>[0], options: TypeOrmModuleOptions = {}): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => (Object.assign({
            ...configService.getItem('database'),
            retryAttempts: configService.getItem('app').isProd ? 3 : 1,
            autoLoadEntities: true,
            dropSchema: false,
            synchronize: false,
            logging: true,
          }, options)),
        }),
        DatabaseModule.forFeature(entities),
      ],
    }
  }

  static forFeature (entityKeys: (keyof typeof entities)[]) {
    return Object.assign(
      TypeOrmModule.forFeature(entityKeys.map(item => entities[item])),
      { global: true },
    )
  }
}
