import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService, ConfigModule } from '@libs/config'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/admin')

  const appConfig = app
    .select(ConfigModule)
    .get(ConfigService, { strict: true })
    .getItem('app')

  await app.listen(appConfig.port)

  console.log(`App running at: ${await app.getUrl()}`)
  console.log(`Env: ${appConfig.env}`)
}

bootstrap()
