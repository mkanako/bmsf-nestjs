import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from '@/modules/Admin/admin.module'
import { ConfigModule, ConfigService } from '@/libs/config'

@Module({
  imports: [
    ConfigModule,
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
    AdminModule,
  ],
})
export class RootModule {}
