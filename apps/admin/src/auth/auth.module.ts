import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@common/config'
import { HashModule } from '@common/hash'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service'
import { AccountService } from '../account.service'

@Module({
  imports: [
    HashModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getItem('jwt').secret,
        signOptions: { expiresIn: configService.getItem('jwt').exp },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    AccountService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
