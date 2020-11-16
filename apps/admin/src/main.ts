import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService, ConfigModule } from '@common/config'
import { AppModule } from './app.module'
import { AuthGuard } from './auth'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/admin')
  app.useGlobalGuards(app.get(AuthGuard))
  app.useGlobalPipes(new ValidationPipe())

  const appConfig = app
    .select(ConfigModule)
    .get(ConfigService, { strict: true })
    .getItem('app')

  await app.listen(appConfig.port)

  console.log(`App running at: ${await app.getUrl()}`)
  console.log(`Env: ${appConfig.env}`)
}

bootstrap()