import { Module, Global } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import multer, { diskStorage } from 'multer'
import dayjs from 'dayjs'
import fs from 'fs-extra'
import * as nuid from 'nuid'
import { ConfigService } from '@common/config'
import { StoragerService } from './storager.service'
import { MULTER_INSTANCE, MULTER_MODULE_OPTIONS } from './storager.constants'

const module = MulterModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    storage: diskStorage({
      destination: (req, file, cb) => {
        const dir = `${configService.getItem('storage').root}/${file.mimetype.split('/')[0]}/${dayjs().format('YYYY/MM/DD')}`
        fs.ensureDirSync(dir)
        cb(null, dir)
      },
      filename: (req, file, cb) => {
        const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`
        cb(null, filename)
      },
    }),
    fileFilter: (req, file, cb) => {
      const isAllowed = configService.get('storage.allowedType', ['image']).includes(file.mimetype.split('/')[0])
      if (isAllowed) {
        cb(null, true)
      } else {
        cb(new Error('invalid file'), false)
      }
    },
  }),
})

@Global()
@Module({
  imports: [
    module,
  ],
  providers: [
    StoragerService,
    {
      inject: [MULTER_MODULE_OPTIONS],
      provide: MULTER_INSTANCE,
      useFactory (options: Parameters<typeof multer>[0] = {}) {
        return multer(options)
      },
    },
  ],
  exports: [
    StoragerService,
    module,
  ],
})
export class LocalStoragerModule {}
